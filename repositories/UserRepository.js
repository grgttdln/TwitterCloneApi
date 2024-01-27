const users = {};

function createUser(username) {
  const user = {
    username,
    following: [],
  };
  users[username] = user;
  return user;
}

function followUser(usernameOfFollower, usernameToFollow) {
  const user = users[usernameOfFollower];
  if (user === undefined) {
    return null;
  }
  if (user.following.includes(usernameToFollow)) {
    return user;
  }

  user.following.push(usernameToFollow);
  return user;
}

function unfollowUser(usernameOfFollower, usernameToUnfollow) {
  const user = users[usernameOfFollower];
  if (user === undefined) {
    return null;
  }

  user.following = user.following.filter(
    (username) => username !== usernameToUnfollow
  );
  return user;
}

function getFollowingUsernames(usernameOfFollower) {
  const user = users[usernameOfFollower];
  if (user === undefined) {
    return [];
  }
  return user.following;
}

export default { createUser, followUser, getFollowingUsernames, unfollowUser };
