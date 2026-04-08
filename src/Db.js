import Dexie from "dexie";

export const db = new Dexie("CVBuilderDB");

db.version(1).stores({
  cv: "id",
});

export const CV_ID = "main";

export async function loadCV() {
  const record = await db.cv.get(CV_ID);
  return record?.data ?? null;
}

export async function saveCV(data) {
  await db.cv.put({ id: CV_ID, data, updatedAt: new Date() });
}

export async function clearCV() {
  await db.cv.delete(CV_ID);
}
