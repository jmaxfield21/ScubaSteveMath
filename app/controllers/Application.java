package controllers;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.util.Assert;

import play.mvc.Controller;
import play.mvc.Http.RequestBody;
import play.mvc.Result;
import views.html.adminstudentrecords;
import views.html.certificate;
import views.html.studentrecords;
import views.html.map;
import database.DatabaseConnectorDude;

public class Application extends Controller {

	public static void loginCheck(){
		if(!isLoggedIn()){
    		redirectToLogin();
    	}
	}
	
	public static Result redirectToLogin(){
		return redirect("/login");
	}
	
	//Start the security checks
    public static Result welcome() {
    	return redirect("/assets/html/welcome.html");
    }
    
    public static Result adminwelcome() {
    	loginCheck();
    	return redirect("/assets/html/adminwelcome.html");
    }
    
    public static Result levelcreators() {
    	loginCheck();
    	return redirect("/assets/html/ECLevelSelect.html");
    }
    
    public static Result level1creator() {
    	loginCheck();
    	return redirect("/assets/html/Level1Creator.html");
    }
    
    public static Result level2creator() {
    	loginCheck();
    	return redirect("/assets/html/Level2Creator.html");
    }
    
    public static Result level3creator() {
    	loginCheck();
    	return redirect("/assets/html/Level3Creator.html");
    }
    
    public static Result level4_5creator() {
    	loginCheck();
    	return redirect("/assets/html/Level4_5Creator.html");
    }
    
    public static Result level1() {
    	loginCheck();
    	return redirect("/assets/html/Level1.html");
    }

    public static Result level2() {
        loginCheck();
        return redirect("/assets/html/Level2.html");
    }

    public static Result level3() {
        loginCheck();
        return redirect("/assets/html/Level3.html");
    }

    public static Result level4() {
        loginCheck();
        return redirect("/assets/html/Level4.html");
    }

    public static Result level5() {
        loginCheck();
        return redirect("/assets/html/Level5.html");
    }
    
    public static Result map() {
    	loginCheck();
    	String username = session("username");
    	
    	return ok(map.render(hasFinishedLevel(username,1), hasFinishedLevel(username,2),hasFinishedLevel(username,3), hasFinishedLevel(username,4), hasFinishedLevel(username,5)));
    }
    
    //Start actual functions
    
    //Sets the current student being viewed
    public static Result setCurrentStudent(){
    	RequestBody body = request().body();
    	String student = body.asFormUrlEncoded().get("student")[0];
    	session("student", student);
    	return ok("Posted");
    }
    
    public static Result showStudentRecords() {
    	loginCheck();
    	try {
    		String username = session("username");
    		String student = session("student");
    		if(student != null){
    			List<String> usernames = DatabaseConnectorDude.getStringsFromResultSet(DatabaseConnectorDude.query("select username from users where first_name=? and last_name=?;", Arrays.asList(student.split(" "))));
    			Assert.isTrue(usernames.size() == 1, String.format("Got multiple users for student %s", student));
    			username =  usernames.get(0);
    			session().remove("student");
    		}
    		
    		List<String> uuids = DatabaseConnectorDude.getStringsFromResultSet(DatabaseConnectorDude.query("select UUID from users where username=?;",Arrays.asList(username)));
    		/* What I'm about to do is SO hacky. Sorry about that. Just trying to get the functionality 
    		 * there without doing several queries. This one just grabs the first and last names of the 
    		 * user in one query rather than the annoying single call per column.
    		  */
    		List<String> names = DatabaseConnectorDude.getStringsFromResultSet(DatabaseConnectorDude.query("select first_name, last_name from users where username=?;",Arrays.asList(username)));
    		Assert.isTrue(uuids.size()==1,"Should not have multiple UUIDs associated with a username.");
    		List<Double> scores = DatabaseConnectorDude.getDoublesFromResultSet(DatabaseConnectorDude.query("select scores.score from scores inner join users on users.UUID=scores.UUID where users.UUID=?;", Arrays.asList(uuids.get(0))));
    		List<Timestamp> times = DatabaseConnectorDude.getTimestampFromResultSet(DatabaseConnectorDude.query("select scores.date from scores inner join users on users.UUID=scores.UUID where users.UUID=?;", Arrays.asList(uuids.get(0))));
    		
    		List<Integer> levelIds = DatabaseConnectorDude.getIntegersFromResultSet(DatabaseConnectorDude.query("select scores.score_level_id from scores inner join users on users.UUID=scores.UUID where users.UUID=?;", Arrays.asList(uuids.get(0))));
    		return ok(studentrecords.render(names, levelIds, scores, getStringsFromTimestamps(times), new Boolean(isCurrentAdmin()) ));
		} catch (SQLException e) {
			e.printStackTrace();
		}
    	return ok("Scuba Steve's database is having problems while trying to get your progress report for you.");
    }
    
    public static Result showAdminStudentRecords() {
    	loginCheck();
    	try {
    		//Grab the non-admins
    		List<String> fnames = DatabaseConnectorDude.getStringsFromResultSet(DatabaseConnectorDude.query("select first_name from users where admin='0';", new ArrayList<String>()));
    		List<String> lnames = DatabaseConnectorDude.getStringsFromResultSet(DatabaseConnectorDude.query("select last_name from users where admin='0';", new ArrayList<String>()));
    		List<List<Double>> scores = new ArrayList<List<Double>>();
    		
    		for(int i = 0; i < fnames.size(); i++){
    			List<Double> levelscores = DatabaseConnectorDude.getDoublesFromResultSet(DatabaseConnectorDude.query("select max(scores.score) from scores inner join users on users.UUID=scores.UUID where users.first_name=? and users.last_name=? group by score_level_id;", Arrays.asList(fnames.get(i),lnames.get(i))));
    			scores.add(levelscores);
    		}
    		
    		return ok(adminstudentrecords.render(fnames, lnames, scores));
    		
		} catch (SQLException e) {
			e.printStackTrace();
		}
    	return ok("Scuba Steve's database is having problems while trying to get your students' progress report for you.");
    }
    
public static Result getCertificate(){
    	
    	RequestBody body = request().body();
    	String name = body.asFormUrlEncoded().get("name")[0];
    	String score = body.asFormUrlEncoded().get("score")[0];
    	String resultString = certificate.render(name, score).toString();
    	return ok(resultString).as("text/html");
}

public static Result showCertificate() {
		loginCheck();
    	try {
    		
    		String username = session("username");
    		List<String> uuids = DatabaseConnectorDude.getStringsFromResultSet(DatabaseConnectorDude.query("select UUID from users where username=?;",Arrays.asList(username)));
    		/* What I'm about to do is SO hacky. Sorry about that. Just trying to get the functionality 
    		 * there without doing several queries. This one just grabs the first and last names of the 
    		 * user in one query rather than the annoying single call per column.
    		  */
    		List<String> names = DatabaseConnectorDude.getStringsFromResultSet(DatabaseConnectorDude.query("select first_name, last_name from users where username=?;",Arrays.asList(username)));
    		Assert.isTrue(uuids.size()==1,"Should not have multiple UUIDs associated with a username.");
    		
    		List<Double> scores = DatabaseConnectorDude.getDoublesFromResultSet(DatabaseConnectorDude.query("select scores.score from scores inner join users on users.UUID=scores.UUID where users.UUID=?;", Arrays.asList(uuids.get(0))));
    		if(scores.size() > 0){
    			return ok(certificate.render(names.get(0) + " " + names.get(1), scores.get(0) + ""));
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
			ResultSet set = DatabaseConnectorDude.query("select password from login where username = ?;", Arrays.asList(username));
			dbPassword = DatabaseConnectorDude.getStringsFromResultSet(set).get(0);
			
			set = DatabaseConnectorDude.query("select admin from users where username = ?;", Arrays.asList(username));
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
		} catch (IndexOutOfBoundsException e){
			e.printStackTrace();
			return ok("We don't appear to have any user by that name!");
		}
		return ok("We're so sorry... Something bad happened.");
    }
    
    public static Result addUser(){
    	loginCheck();
    	RequestBody body = request().body();
    	String username = session("username");
    	String password = body.asFormUrlEncoded().get("password")[0];
    	
        String newFirstName = body.asFormUrlEncoded().get("newFirstName")[0];
        String newLastName = body.asFormUrlEncoded().get("newLastName")[0];
    	String newUsername = body.asFormUrlEncoded().get("newUsername")[0];
    	String newPassword = body.asFormUrlEncoded().get("newPassword")[0];
    	
    	String dbPassword = null;
  	  	boolean isAdmin = false;
  	  	
  	  	//shouldn't ever be null since we already checked if they are logged in. 
  	  	//If a null pointer happens here, I'm sorry about that bad logic
  	  	isAdmin = isAdmin();
  	  
		try {
			ResultSet set = DatabaseConnectorDude.query("select password from login where username = ?;", Arrays.asList(username));
			dbPassword = DatabaseConnectorDude.getStringsFromResultSet(set).get(0);
			
			if(!isAdmin){
				return unauthorized("You must be an administrator to do this!");
			}
	    	  
	    	if(password.equals(dbPassword)){
	    		DatabaseConnectorDude.insert("insert into login values (?,?);", Arrays.asList(newUsername, newPassword));
                DatabaseConnectorDude.insert("insert into users values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
                   Arrays.asList(UUID.randomUUID().toString(), newFirstName, newLastName, newUsername, getCurrentTimeString(), 0 + "", 0 + "", 0 + "", 0 + "", 0 + "", 0 + ""));
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

    private static boolean isCurrentAdmin() {
        String isCurrentAdmin = session("mode");
        if ( "admin".equals(isCurrentAdmin) ) {
            return true;
        }
        return false;
    }
    
    private static String getCurrentTimeString(){
    	String time = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());
    	return time;
    }
    
    private static Boolean hasFinishedLevel(String username, int level) {
    	List<Boolean> hasFinishedList = new ArrayList<Boolean>();
		try {
			hasFinishedList = DatabaseConnectorDude.getBooleansFromResultSet(DatabaseConnectorDude.query("select level_" + level + "_complete from users where username=?;", Arrays.asList(username)));
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		Assert.notEmpty(hasFinishedList, "For some reason, we aren't getting any levels back from the database.");
    	boolean hasFinished = hasFinishedList.get(0);
    	return hasFinished;
	}
}
