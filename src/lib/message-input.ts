import type { InquiryMessageInput, MessageType } from "./types";

type MessageBody = Partial<InquiryMessageInput> & {
  type?: MessageType;
};

export function normalizeMessageInput(body: MessageBody): InquiryMessageInput | null {
  const type = body.type === "product" || body.type === "general" ? body.type : null;
  const passportName = body.passportName?.trim();
  const email = body.email?.trim();
  const messagingId = body.messagingId?.trim();
  const question = body.question?.trim();
  const arrivalDate = body.arrivalDate?.trim();
  const partySize = Number(body.partySize);
  const productId = body.productId?.trim() || null;

  if (
    !type ||
    !passportName ||
    !email ||
    !messagingId ||
    !question ||
    !arrivalDate ||
    Number.isNaN(partySize) ||
    partySize < 1 ||
    partySize > 20
  ) {
    return null;
  }

  if (type === "product" && !productId) {
    return null;
  }

  return {
    type,
    productId,
    passportName,
    email,
    messagingId,
    partySize,
    arrivalDate,
    question,
  };
}
