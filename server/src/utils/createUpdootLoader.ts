import DataLoader from "dataloader";
import { Updoot } from "../entities/Updoot";


// [{postId: 6, userId: 1}]
// [{postId: 6, userId: 1, value: 1}]
export const createUpdootLoader = () => 
new DataLoader<{postId: number, userId: number}, Updoot | null>(
  async keys => {
    const updoots = await Updoot.findByIds(keys as any);
    const updootIdsToUpdoot: Record<string, Updoot> = {};

    updoots.forEach(updoot => {
      updootIdsToUpdoot[`${updoot.userId}|${updoot.postId}`] = updoot;
    })

  return keys.map((key) => updootIdsToUpdoot[`${key.userId}|${key.postId}`]);
})