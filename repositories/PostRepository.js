import { nanoid } from "nanoid";

const posts = {};

function createPost(username, post, dateTimePosted) {
  if (posts[username] === undefined) {
    posts[username] = [];
  }

  const createdPost = {
    postId: nanoid(),
    postedBy: username,
    content: post,
    dateTimePosted,
    likes: [],
  };

  posts[username].push(createdPost);
  return createdPost;
}

function getPostOfUser(username) {
  if (posts[username] === undefined) {
    return [];
  }
  return posts[username];
}

function getFeedOfUser(username, followingUsernames) {
  const feed = [...getPostOfUser(username)];
  console.log(followingUsernames);
  for (const username of followingUsernames) {
    if (posts[username] !== undefined) {
      feed.push(...posts[username]);
    }
  }
  return feed;
}

function likePost(username, postId) {
  const post = posts[username].find((post) => post.postId === postId);
  if (post === undefined) {
    return null;
  }

  if (post.likes.includes(username)) {
    return post;
  }
  post.likes.push(username);
  return post;
}

function unlikePost(username, postId) {
  const post = posts[username].find((post) => post.postId === postId);
  if (post === undefined) {
    return null;
  }

  post.likes = post.likes.filter((like) => like !== username);
  return post;
}

export default {
  createPost,
  getPostOfUser,
  getFeedOfUser,
  likePost,
  unlikePost,
};
