import mongoose from 'mongoose';
import { decrypt } from '@librechat/data-schemas';

export async function getUserOpenRouterKey(userId: string): Promise<string | null> {
  try {
    let Key;

    const dataSchemas = (await import('@librechat/data-schemas')) as any;
    Key = dataSchemas.Key;

    if (!Key && mongoose.models.Key) {
      Key = mongoose.models.Key;
    }

    const objectId = new mongoose.Types.ObjectId(userId);
    const keyValue = await Key.findOne({
      userId: objectId,
      name: 'OpenRouter',
    }).lean();

    if (!keyValue) {
      return null;
    }

    const decryptedKey = await decrypt(keyValue.value);
    const parsedKey: { apiKey: string } = JSON.parse(decryptedKey);

    return parsedKey.apiKey;
  } catch (error) {
    return null;
  }
}