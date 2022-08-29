var app = angular.module("myApp", ["ngRoute"]);

app.controller("myCtrl", function ($scope, $http, $location, $interval) {
  $scope.carts = JSON.parse(localStorage.getItem("cart") || "[]");
  $http
    .get("data.json")
    .then((response) => {
      $scope.products = response.data.products;
    })
    .catch((err) => {
      console.log(err);
    });
  $scope.submitSearch = function (search) {
    $scope.productsSearch = $scope.products.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    console.log($scope.productsSearch);
    $scope.result = search;
    $location.path("/result");
  };

  var controller = this;
  controller.date = new Date();
  $interval(function () {
      controller.date = new Date();
  }, 1000);
  $interval(function () {
      window.location.href = window.location.href + "?rnd=" + Math.random;
  }, 1800000);
});

// Login Services
app.controller("loginController", function ($scope, $location) {
  $scope.lgs = JSON.parse(localStorage.getItem("user") || "[]");

  $scope.login = function (name, pass) {
    $scope.lgs.map((item) => {
      $scope.lg = item;
    });
    if (
      $scope.lg.name !== name ||
      $scope.lg.pass !== pass ||
      !$scope.lg.name ||
      !$scope.lg.pass
    ) {
      alert("Invalid ");
    } else {
      $location.path("/");
      alert("Login Successfully");
    }
  };
});

app.controller(
  "registerController",
  function ($scope, $routeParams, $location, $http) {
    $scope.match = function () {
      $scope.isMatch = angular.equals($scope.pass, $scope.PASS);
    };
    console.log($scope.isMatch);
    $scope.emails = {
      EMAIL_FORMAT:
        /^\w+([\.-]?\w+)*@(list.)?gmail.com+((\s*)+,(\s*)+\w+([\.-]?\w+)*@(list.)?gmail.com)*$/,
      EMAIL_FORMAT_HELP: "Email... Ex: example@example.com",
    };

    $scope.register = function (name, email, pass, PASS) {
      $scope.users = JSON.parse(localStorage.getItem("user") || "[]");
      $scope.data = {
        name,
        email,
        pass,
        PASS,
      };
      if (
        !name ||
        !email ||
        !pass ||
        !PASS ||
        angular.equals($scope.pass, $scope.PASS) == false
      ) {
        alert("Name, Email and Password must be provided");
      } else {
        $scope.users.push($scope.data);
        localStorage.setItem("user", JSON.stringify($scope.users));
        alert("Register Successfully");
        console.log($scope.users);
        $location.path("/login");
      }
    };
  }
);

app.controller(
  "detailsController",
  function ($scope, $http, $location, $routeParams) {
    $scope.uri = $routeParams.id;

    $http
      .get("data.json")
      .then((response) => {
        $scope.datas = response.data.products;
      })
      .catch((err) => {
        console.log(err);
      });

    $scope.qty = 1;

    $scope.minus = function () {
      if ($scope.qty <= 1) {
        $scope.qty = 1;
      } else {
        $scope.qty--;
      }
    };
    $scope.plus = function () {
      $scope.qty++;
    };
    $scope.spinnerText = function () {
      return $scope.qty;
    };
    // cart
    $scope.addToCart = function (item, qty) {
      $scope.carts = JSON.parse(localStorage.getItem("cart") || "[]");
      $scope.data = {
        cart: { item, qty },
      };
      $scope.carts.push($scope.data);
      localStorage.setItem("cart", JSON.stringify($scope.carts));
      console.log($scope.carts);
    };
  }
);

// // get data from local storage
app.controller("cartCtrl", function ($scope) {
  $scope.carts = JSON.parse(localStorage.getItem("cart") || "[]");
  console.log($scope.carts);

  $scope.handleAction = function (id) {
    $scope.find = $scope.carts.findIndex((item) => item.cart.item.id === id);
    $scope.carts.splice($scope.find, 1);
    localStorage.setItem("cart", JSON.stringify($scope.carts));
    console.log($scope.find);
  };
});

app.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "views/home.html",
      })
      .when("/about", {
        templateUrl: "views/about.html",
      })
      .when("/service", {
        templateUrl: "views/service.html",
      })
      .when("/pricing", {
        templateUrl: "views/pricing.html",
      })
      .when("/shop", {
        templateUrl: "views/shop.html",
      })
      .when("/contact", {
        templateUrl: "views/contact.html",
      })
      .when("/result", {
        templateUrl: "views/result.html",
      })
      .when("/details/:id", {
        templateUrl: "views/details.html",
      })
      .when("/cart", {
        templateUrl: "views/cart.html",
      })
      .when("/login", {
        templateUrl: "views/login.html",
      })
      .when("/register", {
        templateUrl: "views/register.html",
      });
  },
]);
