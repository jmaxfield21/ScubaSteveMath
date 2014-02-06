package controllers;
import java.io.File;

import org.springframework.util.Assert;

import play.api.db.DB;
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
    	  
    	  String tables = DatabaseConnectorDude.query("show tables;");
    	  
    	  String dbPassword = DatabaseConnectorDude.query("select password from login;");
    	  
    	  Assert.notNull(password, "How did the password end up being null? We're confused");
    	  
    	  if(password.equals(dbPassword)){
    		  session("username", username);
//        	  return ok(new File("public/html/welcome.html")); 
    		  return ok("logged in successfully");
    	  } else {
    		  return ok("Your username and password don't match anything in our records. Hint: username = \"admin\" and password = \"admin\" right now.");  
    	  }
    	  
//    	  String result = DatabaseConnectorDude.query(query);
    	  session("username", username);
    	  session("password", password);
    	  return ok(username + "\n" + password);
    	}

}
