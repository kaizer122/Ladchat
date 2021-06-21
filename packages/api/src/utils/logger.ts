import Debug from "debug";

export const logInfo = Debug("server:info");
export const logWarning = Debug("server:warning");
export const logError = Debug("server:error");
export const logExpectedError = Debug("server:intended:error");

// Custom colors for clarity
logInfo.color = "69";
logWarning.color = "172";
logError.color = "9";
logExpectedError.color = "13";
