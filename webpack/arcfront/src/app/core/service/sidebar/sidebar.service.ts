import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { routes } from '../../core.index';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor() {
    if (localStorage.getItem('sideBarPosition') == 'expand') {
      this.expandSideBar.next(true);
    } else {
      this.expandSideBar.next(false);
    }
  }

  public sideBarPosition: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('sideBarPosition') || 'false'
  );

  public toggleMobileSideBar: BehaviorSubject<any> = new BehaviorSubject<any>(
    localStorage.getItem('isMobileSidebar') || false
  );

  public expandSideBar: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  public switchSideMenuPosition(): void {
    if (localStorage.getItem('sideBarPosition')) {
      this.sideBarPosition.next('false');
      this.expandSideBar.next(true);
      localStorage.removeItem('sideBarPosition');
    } else {
      this.sideBarPosition.next('true');
      this.expandSideBar.next(false);
      localStorage.setItem('sideBarPosition', 'true');
    }
  }

  public switchMobileSideBarPosition(): void {
    if (localStorage.getItem('isMobileSidebar')) {
      this.toggleMobileSideBar.next(false);
      localStorage.removeItem('isMobileSidebar');
    } else {
      this.toggleMobileSideBar.next(true);
      localStorage.setItem('isMobileSidebar', 'true');
    }
  }

  private sidebarData: Array<any> = [
    {
      tittle: 'Main Menu',
      hasSubRoute: true,
      icon: 'assets/img/icons/menu-icon.svg',
      showSubRoute: false,
      route: '',
      activeRoute: '',
      subRoutes: [
        {
          tittle: 'Dashboard',
          hasSubRoute: false,
          icon: 'assets/img/icons/dashboard.svg',
          showSubRoute: false,
          route: routes.dashboard,
          activeRoute: this.getActiveRoute(routes.dashboard),
          subRoutes: [],
        },
        {
          tittle: 'Product',
          hasSubRoute: true,
          icon: 'assets/img/icons/product.svg',
          showSubRoute: false,
          route: routes.product,
          activeRoute: this.getActiveRoute(routes.product),
          subRoutes: [
            {
              tittle: 'Product List',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.productList,
              activeRoute: this.getActiveRoute(routes.productList),
              subRoutes: [],
            },
            {
              tittle: 'Add Product',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.addProduct,
              activeRoute: this.getActiveRoute(routes.addProduct),
              subRoutes: [],
            },
            {
              tittle: 'Category List',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.categoryList,
              activeRoute: this.getActiveRoute(routes.categoryList),
              subRoutes: [],
            },
            {
              tittle: 'Add Category',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.addCategory,
              activeRoute: this.getActiveRoute(routes.addCategory),
              subRoutes: [],
            },
            {
              tittle: 'Sub Category List',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.subCategoryList,
              activeRoute: this.getActiveRoute(routes.subCategoryList),
              subRoutes: [],
            },
            {
              tittle: 'Add Sub Category',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.addSubcategory,
              activeRoute: this.getActiveRoute(routes.addSubcategory),
              subRoutes: [],
            },
            {
              tittle: 'Brand List',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.brandList,
              activeRoute: this.getActiveRoute(routes.brandList),
              subRoutes: [],
            },
            {
              tittle: 'Import Products',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.importProduct,
              activeRoute: this.getActiveRoute(routes.importProduct),
              subRoutes: [],
            },
            {
              tittle: 'Print Barcode',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.barcode,
              activeRoute: this.getActiveRoute(routes.barcode),
              subRoutes: [],
            },
          ],
        },
       

        {
          tittle: 'People',
          hasSubRoute: true,
          icon: 'assets/img/icons/users1.svg',
          showSubRoute: false,
          route: routes.people,
          activeRoute: this.getActiveRoute(routes.people),
          subRoutes: [
            {
              tittle: 'Customer List',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.customerList,
              activeRoute: this.getActiveRoute(routes.customerList),
              subRoutes: [],
            },
            {
              tittle: 'Add Customer',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.addCustomer,
              activeRoute: this.getActiveRoute(routes.addCustomer),
              subRoutes: [],
            },
            {
              tittle: 'Supplier List',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.supplierList,
              activeRoute: this.getActiveRoute(routes.supplierList),
              subRoutes: [],
            },
            {
              tittle: 'Add Supplier',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.addSupplier,
              activeRoute: this.getActiveRoute(routes.addSupplier),
              subRoutes: [],
            },
            {
              tittle: 'User List',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.userList,
              activeRoute: this.getActiveRoute(routes.userList),
              subRoutes: [],
            },
            {
              tittle: 'Add User',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.addUser,
              activeRoute: this.getActiveRoute(routes.addUser),
              subRoutes: [],
            },
            {
              tittle: 'Store List',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.storeList,
              activeRoute: this.getActiveRoute(routes.storeList),
              subRoutes: [],
            },
            {
              tittle: 'Add Store',
              hasSubRoute: false,
              icon: '',
              showSubRoute: false,
              route: routes.addStore,
              activeRoute: this.getActiveRoute(routes.addStore),
              subRoutes: [],
            },
          ],
        },

      ],
    },

    {
      tittle: 'Users',
      hasSubRoute: true,
      icon: 'assets/img/icons/users1.svg',
      showSubRoute: false,
      route: '',
      activeRoute: 'users',
      subRoutes: [
        {
          tittle: 'New User',
          hasSubRoute: false,
          icon: '',
          showSubRoute: false,
          route: routes.newUser,
          activeRoute: this.getActiveRoute(routes.newUser),
          subRoutes: [],
        },
        {
          tittle: 'User List',
          hasSubRoute: false,
          icon: '',
          showSubRoute: false,
          route: routes.usersUserList,
          activeRoute: this.getActiveRoute(routes.usersUserList),
          subRoutes: [],
        },
      ],
    },

   

   
  ];

  public getSideBarData :BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(this.sidebarData)
  getActiveRoute(route: string): string {
    let url = route.split('/');
    return url[url.length - 1];
  }
}
