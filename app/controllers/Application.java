package controllers;
import java.io.File;

import org.springframework.util.Assert;

import play.mvc.Controller;
import play.mvc.Http.RequestBody;
import play.mvc.Result;
import database.DatabaseConnectorDude;
import database.DatabaseConnectorMocked;

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
    	  
    	  //Not how it will actually look. I just need a database result of sorts. 
    	  String dbPassword = DatabaseConnectorMocked.query("goodLogin");
    	  
    	  Assert.notNull(password, "How did the password end up being null? We're confused");
    	  
    	  if(password.equals(dbPassword)){
    		  session("username", username);
//        	  return ok(new File("public/html/welcome.html")); 
    		  return ok();
    	  } else {
    		  return ok("Your username and password don't match anything in our records. Hint: username = \"admin\" and password = \"admin\" right now.");  
    	  }
    	  
    	}

}
