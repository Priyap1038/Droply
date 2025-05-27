import {
  pgTable,
  text,
  uuid,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey(),

  // basic file/folder information
  name: text("name").notNull(),
  path: text("path").notNull(), // / document/project/resume
  size: integer("size").notNull(),
  type: text("type").notNull(), //folder

  // Storage information
  fileUrl: text("file_url").notNull(), //url to access file
  thumbnailUrl: text("thumbnail_url"),

  // ownership and also save the heriarchical
  userId: text("user_id").notNull(),
  parentId: uuid("parent_id"), //pardnt folder id (null for root items)

  //file folder flags - click bookmark or sekect folder
  isFolder: boolean("is_folder").default(false).notNull(),
  isStarred: boolean("is_starred").default(false).notNull(),
  isTrash: boolean("is_trash").default(false).notNull(),

  //timestamps
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/*
parent: each file/folder can have 1 parent folder

childeren: each folder can have many child file/folder
*/

export const fileRelations = relations(files, ({ one, many }) => ({
  parent: one(files, {
    fields: [files.parentId],
    references: [files.id],
  }),

  //relationship to child file/folder
  children: many(files),
}));

//type definations

export type File = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;
