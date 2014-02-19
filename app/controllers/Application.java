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
	    		  return redirect("/welcome");
	    	} else {
	    		  return redirect("/login");  
	    	}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return ok("We're so sorry... Something bad happened.");
    }
    
    //untested
    public static Result addUser(){
    	if(!isLoggedIn()){
    		return unauthorized("Scuba Steve wants you to login before proceeding!");
    	}
    	
    	RequestBody body = request().body();
    	String username = session("username");
    	String password = body.asFormUrlEncoded().get("password")[0];
    	
    	String newUsername = body.asFormUrlEncoded().get("newUsername")[0];
    	String newPassword = body.asFormUrlEncoded().get("newPassword")[0];
    	
    	String dbPassword = null;
  	  	boolean isAdmin = false;
  	  	
  	  	//shouldn't ever be null since we already checked if they are logged in. 
  	  	//If a null pointer happens here, I'm sorry about that bad logic
  	  	isAdmin = new Boolean(session("isAdmin")).booleanValue();
  	  
		try {
			ResultSet set = DatabaseConnectorDude.query("select password from login where username = \'" + username + "\';");
			dbPassword = DatabaseConnectorDude.getStringsFromResultSet(set).get(0);
			
			if(!isAdmin){
				return unauthorized("You must be an administrator to do this!");
			}
	    	  
	    	if(password.equals(dbPassword)){
	    		DatabaseConnectorDude.query(String.format("insert into login values ('%s','%s')", newUsername, newPassword));
	    		return redirect("/adduser");
	    	} else {
	    		return unauthorized("Your password was incorrect");  
	    	}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return ok("We're so sorry... Something bad happened.");
    }
    
    public static Result logout() {
    	session().clear();
    	return redirect("/login");
    }

    private static boolean isLoggedIn(){
    	String username = session("username");
    	if(username != null){
    		return true;
    	}
    	return false;
    }
}
