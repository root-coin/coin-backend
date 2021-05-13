class User {
  constructor(user) {
    this.user_id = user.userId || '';
    this.user_password = user.userPassword || '';
    this.user_nickname = user.userNickname || '';
  }

  static create() {}

  static update() {}

  static read() {}

  static delete() {}
}

module.exports = User;
