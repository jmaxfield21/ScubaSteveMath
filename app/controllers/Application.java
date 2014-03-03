package controllers;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.util.Assert;

import play.mvc.Controller;
import play.mvc.Http.RequestBody;
import play.mvc.Result;
import views.html.index;
import views.html.studentrecords;
import database.DatabaseConnectorDude;

public class Application extends Controller {
	DatabaseConnectorDude mDbConnection = new DatabaseConnectorDude();

    public static Result index() {
    	try {
			List<String> list = DatabaseConnectorDude.getStringsFromResultSet(DatabaseConnectorDude.query("select username from login;"));
			return ok(index.render(list));
		} catch (SQLException e) {
			e.printStackTrace();
		}
    	return ok("error");
    }
    
    public static Result showStudentRecords() {
    	
    	if(!isLoggedIn()){
    		return unauthorized("Scuba Steve wants you to login before proceeding!");
    	}
    	
    	try {
    		
    		String username = session("username");
    		List<String> uuids = DatabaseConnectorDude.getStringsFromResultSet(DatabaseConnectorDude.query(String.format("select UUID from users where username='%s';",username)));
    		/* What I'm about to do is SO hacky. Sorry about that. Just trying to get the functionality 
    		 * there without doing several queries. This one just grabs the first and last names of the 
    		 * user in one query rather than the annoying single call per column.
    		  */
    		List<String> names = DatabaseConnectorDude.getStringsFromResultSet(DatabaseConnectorDude.query(String.format("select first_name, last_name from users where username='%s';",username)));
    		Assert.isTrue(uuids.size()==1,"Should not have multiple UUIDs associated with a username.");
    		
    		List<Double> scores = DatabaseConnectorDude.getDoublesFromResultSet(DatabaseConnectorDude.query("select scores.score from scores inner join users on users.UUID=scores.UUID where users.UUID='uuid1';"));
    		List<Integer> levelIds = DatabaseConnectorDude.getIntegersFromResultSet(DatabaseConnectorDude.query(String.format("select scores.score_level_id from scores inner join users on users.UUID=scores.UUID where users.UUID='%s';", uuids.get(0))));
    		return ok(studentrecords.render(names, levelIds, scores));
		} catch (SQLException e) {
			e.printStackTrace();
		}
    	return ok("Scuba Steve's database is having problems when trying to get your progress report for you.");
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
