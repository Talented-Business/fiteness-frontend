import { createActions } from "redux-actions";

export const {
  createPost,
  updatePost,
  deletePost,
  createComment,
  updateComment,
  deleteComment,
  appendComments,
  appendNextComments,
  createReply,
  appendNextReplies,
  hideReplies,
  toggleLike,
  removePostStore,
  openEditModal,
  closeEditModal,
  findNewsfeed,
  appendNewsfeedAfter,
  addNewsfeedBefore,
  addNewsfeedAfter,
  setNewsfeed,
  refreshNewsfeed,
  findCustomerPosts,
  appendCustomerPostsAfter,
  addCustomerPostsAfter,
  setCustomerPosts,
  refreshCustomerPosts,
  setItemValue,
  findPost,
  findRandomMedias,
  appendCustomerPostMediasAfter,
  addCustomerPostMediasAfter,
  syncPosts,
  readingPost,
  appendSuggestedPosts,
  refreshSuggestedPosts,
  refreshPosts,
  convertOldNewsfeed,
  appendOldNewsfeed,
  refreshOldNewsfeed,
} = createActions(
  "CREATE_POST",
  "UPDATE_POST",
  "DELETE_POST",
  "CREATE_COMMENT",
  "UPDATE_COMMENT",
  "DELETE_COMMENT",
  "APPEND_COMMENTS",
  "APPEND_NEXT_COMMENTS",
  "CREATE_REPLY",
  "APPEND_NEXT_REPLIES",
  "HIDE_REPLIES",
  "TOGGLE_LIKE",
  "REMOVE_POST_STORE",
  "OPEN_EDIT_MODAL",
  "CLOSE_EDIT_MODAL",
  "FIND_NEWSFEED",
  "APPEND_NEWSFEED_AFTER",
  "ADD_NEWSFEED_BEFORE",
  "ADD_NEWSFEED_AFTER",
  "SET_NEWSFEED",
  "REFRESH_NEWSFEED",
  "FIND_CUSTOMER_POSTS",
  "APPEND_CUSTOMER_POSTS_AFTER",
  "ADD_CUSTOMER_POSTS_AFTER",
  "SET_CUSTOMER_POSTS",
  "REFRESH_CUSTOMER_POSTS",
  "SET_ITEM_VALUE",
  "FIND_POST",
  "FIND_RANDOM_MEDIAS",
  "APPEND_CUSTOMER_POST_MEDIAS_AFTER",
  "ADD_CUSTOMER_POST_MEDIAS_AFTER",
  "SYNC_POSTS",
  "READING_POST",
  "APPEND_SUGGESTED_POSTS",
  "REFRESH_SUGGESTED_POSTS",
  "REFRESH_POSTS",
  "CONVERT_OLD_NEWSFEED",
  "APPEND_OLD_NEWSFEED",
  "REFRESH_OLD_NEWSFEED",
  { prefix: "POST" }
);