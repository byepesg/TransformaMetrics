

export default class MenuService {
    async getMenu() {
        return MenuModel.fromJson(menu);
    }
}

