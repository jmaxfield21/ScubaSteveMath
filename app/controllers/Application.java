package controllers;
import database.DatabaseConnectorDude;
import play.mvc.Controller;
import play.mvc.Http.RequestBody;
import play.mvc.Result;

public class Application extends Controller {
	DatabaseConnectorDude mDbConnection = new DatabaseConnectorDude();

    public static Result index() {
//        return ok(index.render("Your new application is ready."));
    	return ok("Hello world");
    }
    
    public static Result loginSubmit() {
    	  RequestBody body = request().body();
    	  String username = body.asFormUrlEncoded().get("username")[0];
    	  String password = body.asFormUrlEncoded().get("password")[0];
    	  //An experiment with my own little database that I have
//    	  String query = "select * from People;";
//    	  String result = DatabaseConnectorDude.query(query);
    	  session("username", username);
    	  session("password", password);
    	  return ok(username + "\n" + password);
    	}

}
