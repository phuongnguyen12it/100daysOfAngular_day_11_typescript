//Clousure in javascript
function createStorage(key: string) {
  const store = JSON.parse(localStorage.getItem(key)) ?? {};
  const save = () => {
    localStorage.setItem(key, JSON.stringify(store));
  };
  const storage = {
    get(key: string) {
      return store[key];
    },
    set(key: string, value: string | number) {
      store[key] = value;
      save();
    },
    remove(key: string) {
      delete store[key];
      save();
    },
  };
  return storage;
}

const profileSetting = createStorage('profileSetting');
profileSetting.set('role', 'user');
profileSetting.set('email', 'user1@mailinator.com');
profileSetting.set('age', 20);
profileSetting.set('address', 'jupiter');
console.log(profileSetting.get('email'));
//tiec tung nao ko co luc tan, kich nao ko den luc ha man
