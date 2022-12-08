const USER_TOKEN = "userToken";
const USER_ID = "userId";

class SessionStorage {
  static setTokenItem(token: string) {
    sessionStorage.setItem(USER_TOKEN, token);
  }
  static setUserIdItem(userId: string) {
    sessionStorage.setItem(USER_ID, userId);
  }
  static setIdItem(Id: string) {
    sessionStorage.setItem("Id", Id);
  }

  static getTokenItem() {
    return sessionStorage.getItem(USER_TOKEN);
  }

  static clearAllItem() {
    sessionStorage.clear();
  }
}

Object.freeze(Storage);
export default SessionStorage;
