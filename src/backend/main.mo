import Time "mo:core/Time";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  type MenuCategory = {
    #burgers;
    #pizza;
    #momos;
    #rolls;
    #coldDrinks;
  };

  type MenuItem = {
    name : Text;
    category : MenuCategory;
    priceInr : Nat;
    description : Text;
    imageUrl : Text;
  };

  type ContactSubmission = {
    name : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type Review = {
    name : Text;
    rating : Nat; // 1-5
    comment : Text;
    timestamp : Time.Time;
  };

  module MenuCategory {
    public func toText(category : MenuCategory) : Text {
      switch (category) {
        case (#burgers) { "Burgers" };
        case (#pizza) { "Pizza" };
        case (#momos) { "Momos" };
        case (#rolls) { "Rolls" };
        case (#coldDrinks) { "Cold Drinks" };
      };
    };
  };

  module MenuItem {
    public func compare(a : MenuItem, b : MenuItem) : Order.Order {
      Text.compare(a.name, b.name);
    };
  };

  module Review {
    public func compareByRating(a : Review, b : Review) : Order.Order {
      Nat.compare(b.rating, a.rating);
    };
  };

  let menuItems = Map.empty<Text, MenuItem>();
  let contactSubmissions = Map.empty<Text, ContactSubmission>();
  var nextSubmissionId = 0;

  var reviews = [
    {
      name = "Ravi Kumar";
      rating = 5;
      comment = "Best momos in town! Loved the spicy chutney.";
      timestamp = Time.now();
    },
    {
      name = "Priya Sharma";
      rating = 4;
      comment = "Delicious burgers, but the pizza could be crispier.";
      timestamp = Time.now();
    },
    {
      name = "Sandeep Singh";
      rating = 5;
      comment = "Amazing rolls! Quick service and friendly staff.";
      timestamp = Time.now();
    },
    {
      name = "Anjali Patel";
      rating = 4;
      comment = "Great variety of cold drinks. Perfect for summers!";
      timestamp = Time.now();
    },
    {
      name = "Vikas Gupta";
      rating = 5;
      comment = "Love the Paneer Tikka Pizza. A must-try!";
      timestamp = Time.now();
    },
    {
      name = "Amit";
      rating = 5;
      comment = "Crispy veg rolls, just like street food.";
      timestamp = Time.now();
    },
    {
      name = "Nisha";
      rating = 4;
      comment = "Excellent customer service and tasty food.";
      timestamp = Time.now();
    },
    {
      name = "Rahul";
      rating = 5;
      comment = "Chicken burgers are juicy and flavorful.";
      timestamp = Time.now();
    },
  ];

  public shared ({ caller }) func initializeMenuItems() : async () {
    if (menuItems.size() > 0) { Runtime.trap("Menu already initialized") };

    let items = [
      // Burgers
      {
        name = "Veggie Burger";
        category = #burgers;
        priceInr = 120;
        description = "A delicious veggie patty with fresh lettuce, tomato, and cheese.";
        imageUrl = "https://example.com/images/veggie_burger.jpg";
      },
      {
        name = "Chicken Burger";
        category = #burgers;
        priceInr = 150;
        description = "Juicy chicken patty with crispy lettuce and spicy mayo.";
        imageUrl = "https://example.com/images/chicken_burger.jpg";
      },
      {
        name = "Paneer Tikka Burger";
        category = #burgers;
        priceInr = 130;
        description = "Grilled paneer tikka with tangy sauce and fresh veggies.";
        imageUrl = "https://example.com/images/paneer_burger.jpg";
      },
      // Pizza
      {
        name = "Margherita Pizza";
        category = #pizza;
        priceInr = 200;
        description = "Classic cheese and tomato pizza with a crispy crust.";
        imageUrl = "https://example.com/images/margherita_pizza.jpg";
      },
      {
        name = "Veggie Delight Pizza";
        category = #pizza;
        priceInr = 250;
        description = "Loaded with fresh veggies and mozzarella cheese.";
        imageUrl = "https://example.com/images/veggie_pizza.jpg";
      },
      {
        name = "Chicken BBQ Pizza";
        category = #pizza;
        priceInr = 300;
        description = "Tender chicken pieces with BBQ sauce and cheese.";
        imageUrl = "https://example.com/images/chicken_pizza.jpg";
      },
      // Momos
      {
        name = "Veg Momos";
        category = #momos;
        priceInr = 100;
        description = "Steamed dumplings filled with fresh veggies.";
        imageUrl = "https://example.com/images/veg_momos.jpg";
      },
      {
        name = "Chicken Momos";
        category = #momos;
        priceInr = 150;
        description = "Juicy chicken-filled dumplings served with spicy dip.";
        imageUrl = "https://example.com/images/chicken_momos.jpg";
      },
      {
        name = "Paneer Momos";
        category = #momos;
        priceInr = 120;
        description = "Paneer stuffed momos with a hint of spices.";
        imageUrl = "https://example.com/images/paneer_momos.jpg";
      },
      // Rolls
      {
        name = "Veg Roll";
        category = #rolls;
        priceInr = 80;
        description = "Crispy roll filled with spicy veggies and sauces.";
        imageUrl = "https://example.com/images/veg_roll.jpg";
      },
      {
        name = "Chicken Roll";
        category = #rolls;
        priceInr = 120;
        description = "Tender chicken pieces wrapped in a soft roll.";
        imageUrl = "https://example.com/images/chicken_roll.jpg";
      },
      {
        name = "Paneer Tikka Roll";
        category = #rolls;
        priceInr = 100;
        description = "Grilled paneer tikka wrapped in a spicy roll.";
        imageUrl = "https://example.com/images/paneer_roll.jpg";
      },
      // Cold Drinks
      {
        name = "Mango Shake";
        category = #coldDrinks;
        priceInr = 80;
        description = "Refreshing mango shake made with fresh mangoes.";
        imageUrl = "https://example.com/images/mango_shake.jpg";
      },
      {
        name = "Cold Coffee";
        category = #coldDrinks;
        priceInr = 70;
        description = "Chilled coffee with a hint of chocolate.";
        imageUrl = "https://example.com/images/cold_coffee.jpg";
      },
      {
        name = "Lime Soda";
        category = #coldDrinks;
        priceInr = 60;
        description = "Cool and refreshing lime soda perfect for summers.";
        imageUrl = "https://example.com/images/lime_soda.jpg";
      },
    ];

    for (item in items.values()) {
      menuItems.add(item.name, item);
    };
  };

  public query ({ caller }) func getAllMenuItems() : async [MenuItem] {
    menuItems.values().toArray().sort();
  };

  public query ({ caller }) func getMenuItemsByCategory(category : MenuCategory) : async [MenuItem] {
    let filteredItems = menuItems.values().toArray().filter(
      func(item) { item.category == category }
    );
    filteredItems.sort();
  };

  public shared ({ caller }) func submitContactForm(name : Text, phone : Text, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      phone;
      message;
      timestamp = Time.now();
    };
    let submissionId = nextSubmissionId.toText();
    contactSubmissions.add(submissionId, submission);
    nextSubmissionId += 1;
  };

  public query ({ caller }) func getContactSubmissions() : async [ContactSubmission] {
    contactSubmissions.values().toArray();
  };

  public query ({ caller }) func getReviews() : async [Review] {
    reviews.sort(Review.compareByRating);
  };

  public shared ({ caller }) func addReview(name : Text, rating : Nat, comment : Text) : async () {
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };

    let newReview : Review = {
      name;
      rating;
      comment;
      timestamp = Time.now();
    };

    reviews := reviews.concat([newReview]);
  };
};
