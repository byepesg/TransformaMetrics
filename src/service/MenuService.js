
import menu from "../mocks/menu.json";
export default class MenuService {
    async getMenu() {
        return MenuModel.fromJson(menu);
    }
}

