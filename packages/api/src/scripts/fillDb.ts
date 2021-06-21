import { getRandomAvatar } from "@ladchat/shared";
import { DocumentType } from "@typegoose/typegoose";
import bcrypt from "bcryptjs";
import faker from "faker/locale/en";
import { ObjectId } from "mongodb";
import createMongoConnection from "../loaders/mongoConnection";
import { ConversationModel } from "../modules/conversation/entities/conversation";
import {
  Message,
  MessageModel,
} from "../modules/conversation/entities/message";
import { User, UserModel } from "../modules/user/entities/User";

const NUMBER_OF_USERS = 20;
const NUMBER_OF_CONVERSATIONS_PER_USER = 5;
const NUMBER_OF_MESSAGES_PER_CONVERSATION = 50;

const makeUsers = async (num: number): Promise<DocumentType<User>[]> => {
  let password = "123456";
  password = await bcrypt.hash(password, 10);
  const users: DocumentType<User>[] = [];
  for (let i = 0; i < num; i += 1) {
    const { avatarUrl } = getRandomAvatar();

    const player = new UserModel({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.unique(faker.internet.email),
      password,
      avatarUrl,
    });
    try {
      const u = await player.save();
      users.push(u as DocumentType<User>);
    } catch (e) {
      console.log(e);
    }
  }
  return users;
};

const makeRandomConversations = async ({
  users,
  numberOfMessages,
  numberOfConversation,
}: {
  users: DocumentType<User>[];
  numberOfMessages: number;
  numberOfConversation: number;
}) => {
  for (const user of users) {
    const blackListedIds: string[] = [user._id.toHexString()];

    for (let i = 0; i < numberOfConversation; i++) {
      const userIds = users
        .map((u) => u._id)
        .filter((u) => !blackListedIds.includes(u.toHexString()))
        .map((u) => u.toHexString());

      if (!userIds.length) break;

      const friendId = faker.random.arrayElement(userIds);
      // add user to ignored userIds
      blackListedIds.push(friendId);

      const conversationId = new ObjectId();

      const messages = await generateConversationMessages({
        users: [user._id, friendId],
        number: numberOfMessages,
        conversationId,
      });
      const messageIds = messages.map((m) => m._id);
      await new ConversationModel({
        _id: conversationId,
        participants: [user._id, friendId],
        messages: messageIds,
      }).save();
    }
  }
};

const generateConversationMessages = async ({
  users,
  number,
  conversationId,
}: {
  users: (string | ObjectId)[];
  number: number;
  conversationId: ObjectId;
}) => {
  const messages: Promise<DocumentType<Message>>[] = [];
  for (let i = 0; i < number; i++) {
    const sender = faker.random.arrayElement(users);

    try {
      const message = new MessageModel({
        message: faker.hacker.phrase(),
        sender,
        createdAt: faker.date.recent(2),
        conversationId,
      }).save();
      messages.push(message as Promise<DocumentType<Message>>);
    } catch (e) {
      console.log(e);
    }
  }
  return await Promise.all(messages);
};

async function clearDb() {
  try {
    console.log("Starting delete");
    const res = await Promise.all([
      UserModel.deleteMany({}).lean(),
      MessageModel.deleteMany({}).lean(),
      ConversationModel.deleteMany({}).lean(),
    ]);
    console.log(res);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

async function fillDb() {
  try {
    await createMongoConnection();
    await clearDb();

    console.log("Starting generation");
    const users = await makeUsers(NUMBER_OF_USERS);
    await makeRandomConversations({
      users,
      numberOfConversation: NUMBER_OF_CONVERSATIONS_PER_USER,
      numberOfMessages: NUMBER_OF_MESSAGES_PER_CONVERSATION,
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

fillDb()
  .then(() => {
    console.log(`Created ${NUMBER_OF_USERS} users !`);
    console.log(
      `Created ${NUMBER_OF_CONVERSATIONS_PER_USER} conversations per user !`
    );
    console.log(
      `Created ${NUMBER_OF_MESSAGES_PER_CONVERSATION} messages per conversation !`
    );
    process.exit();
  })
  .catch((e) => console.log(e));
