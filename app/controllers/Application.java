package controllers;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.util.Assert;

import play.mvc.Controller;
import play.mvc.Http.RequestBody;
import play.mvc.Result;
import database.DatabaseConnectorDude;

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
    	  session().clear();
    	  
    	  String dbPassword = null;
    	  boolean isAdmin = false;
    	  
		try {
			ResultSet set = DatabaseConnectorDude.query("select password from login where username = \'" + username + "\';");
			dbPassword = DatabaseConnectorDude.getStringsFromResultSet(set).get(0);
			
			set = DatabaseConnectorDude.query("select admin from users where username like \'" + username + "\';");
			isAdmin = DatabaseConnectorDude.getBooleansFromResultSet(set).get(0).booleanValue();
			
			Assert.notNull(password, "How did the password end up being null? We're confused");
	    	  
	    	if(password.equals(dbPassword)){
	    		  session("username", username);
	    		  session("isAdmin", isAdmin + "");
	    		  return ok("logged in successfully");
	    	} else {
	    		  return ok("Your username and password don't match anything in our records.");  
	    	}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return null;
    }

}
