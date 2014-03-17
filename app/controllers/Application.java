package controllers;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.util.Assert;

import play.mvc.Controller;
import play.mvc.Http.RequestBody;
import play.mvc.Result;
import views.html.certificate;
import views.html.studentrecords;
import views.html.adminstudentrecords;
import database.DatabaseConnectorDude;

public class Application extends Controller {

	//Start the security checks
    public static Result welcome() {
    	if(!isLoggedIn()){
    		return redirect("/login");
    	}
    	
    	return redirect("/assets/html/welcome.html");
    }
    
    public static Result adminwelcome() {
    	if(!isLoggedIn()){
    		return redirect("/login");
    	}
    	
    	return redirect("/assets/html/adminwelcome.html");
    }
    
    public static Result map() {
    	if(!isLoggedIn()){
    		return redirect("/login");
    	}
    	
    	return redirect("/assets/html/map.html");
    }
    
    public static Result levelcreators() {
    	if(!isLoggedIn()){
    		return redirect("/login");
    	}
    	
    	return redirect("/assets/html/ECLevelSelect.html");
    }
    
    public static Result level1creator() {
    	if(!isLoggedIn()){
    		return redirect("/login");
    	}
    	
    	return redirect("/assets/html/Level1Creator.html");
    }
    
    public static Result level2creator() {
    	if(!isLoggedIn()){
    		return redirect("/login");
    	}
    	
    	return redirect("/assets/html/Level2Creator.html");
    }
    
    public static Result level3creator() {
    	if(!isLoggedIn()){
    		return redirect("/login");
    	}
    	
    	return redirect("/assets/html/Level3Creator.html");
    }
    
    public static Result level4_5creator() {
    	if(!isLoggedIn()){
    		return redirect("/login");
    	}
    	
    	return redirect("/assets/html/Level4_5Creator.html");
    }
    
    public static Result gamePage() {
    	if(!isLoggedIn()){
    		return redirect("/login");
    	}
    	
    	return redirect("/assets/html/gamePage.html");
    }

    //Start actual functions
    public static Result showStudentRecords() {
    	
    	if(!isLoggedIn()){
    		 return redirect("/login");
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
    		List<Double> scores = DatabaseConnectorDude.getDoublesFromResultSet(DatabaseConnectorDude.query(String.format("select scores.score from scores inner join users on users.UUID=scores.UUID where users.UUID='%s';", uuids.get(0))));
    		List<Timestamp> times = DatabaseConnectorDude.getTimestampFromResultSet(DatabaseConnectorDude.query(String.format("select scores.date from scores inner join users on users.UUID=scores.UUID where users.UUID='%s';", uuids.get(0))));
    		
    		List<Integer> levelIds = DatabaseConnectorDude.getIntegersFromResultSet(DatabaseConnectorDude.query(String.format("select scores.score_level_id from scores inner join users on users.UUID=scores.UUID where users.UUID='%s';", uuids.get(0))));
    		return ok(studentrecords.render(names, levelIds, scores, getStringsFromTimestamps(times)));
		} catch (SQLException e) {
			e.printStackTrace();
		}
    	return ok("Scuba Steve's database is having problems while trying to get your progress report for you.");
    }
    
    public static Result showAdminStudentRecords() {
    	
    	if(!isLoggedIn() || !isAdmin()){
    		 return redirect("/login");
    	}
    	
    	try {
    		//Grab the non-admins
    		List<String> fnames = DatabaseConnectorDude.getStringsFromResultSet(DatabaseConnectorDude.query("select first_name from users where admin='0';"));
    		List<String> lnames = DatabaseConnectorDude.getStringsFromResultSet(DatabaseConnectorDude.query("select last_name from users where admin='0';"));
    		List<List<Double>> scores = new ArrayList<List<Double>>();
    		for(int i = 0; i < fnames.size(); i++){
    			List<Double> levelscores = DatabaseConnectorDude.getDoublesFromResultSet(DatabaseConnectorDude.query(String.format("select max(scores.score) from scores inner join users on users.UUID=scores.UUID where users.first_name='%s' and users.last_name='%s' group by score_level_id;", fnames.get(i),lnames.get(i))));
    			scores.add(levelscores);
    		}
    		
    		return ok(adminstudentrecords.render(fnames, lnames, scores));
		} catch (SQLException e) {
			e.printStackTrace();
		}
    	return ok("Scuba Steve's database is having problems while trying to get your students' progress report for you.");
    }
    
public static Result showCertificate() {
    	
    	if(!isLoggedIn()){
    		 return redirect("/login");
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
    		
    		List<Double> scores = DatabaseConnectorDude.getDoublesFromResultSet(DatabaseConnectorDude.query(String.format("select scores.score from scores inner join users on users.UUID=scores.UUID where users.UUID='%s';", uuids.get(0))));
    		if(scores.size() > 0){
    			return ok(certificate.render(names, scores.get(0)));
    		} else {
    			return ok("We don't have a certificate for you because you haven't played yet!");
    		}
		} catch (SQLException e) {
			e.printStackTrace();
		}
    	return ok("Scuba Steve's database is having problems while trying to get your certificate for you.");
    }
    
    public static Result loginSubmit() {
    	  RequestBody body = request().body();
    	  String username = body.asFormUrlEncoded().get("username")[0];
    	  String password = body.asFormUrlEncoded().get("password")[0];
    	  String askedForAdmin = null;
    	  try{
    		  askedForAdmin = body.asFormUrlEncoded().get("admin")[0];
    	  } catch(NullPointerException e) {
    		  System.out.println(String.format("User %s not logging in as admin.",username));
    	  }
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
	    		  if(askedForAdmin != null && isAdmin){
	    			  session("username", username);
		    		  session("isAdmin", isAdmin + "");
		    		  session("mode", "admin");
	    			  return redirect("/adminwelcome");
	    		  } else {
		    		  session("username", username);
		    		  session("isAdmin", isAdmin + "");
		    		  session("mode", "user");
		    		  return redirect("/welcome");
	    		  }
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
	    		DatabaseConnectorDude.insert(String.format("insert into login values ('%s','%s')", newUsername, newPassword));
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
    
    public static List<String> getStringsFromTimestamps(List<Timestamp> times){
    	List<String> stringys = new ArrayList<String>();
    	Date date = new Date();
    	DateFormat dateFormat = new SimpleDateFormat();
    	
    	for(Timestamp time : times){
    		date.setTime(time.getTime());
    		stringys.add(dateFormat.format(date));
    	}
    	return stringys;
    }

    private static boolean isLoggedIn(){
    	String username = session("username");
    	if(username != null){
    		return true;
    	}
    	return false;
    }
    
    private static boolean isAdmin() {
		String isAdmin = session("isAdmin");
		if("true".equals(isAdmin)){
			return true;
		}
		return false;
	}
}
