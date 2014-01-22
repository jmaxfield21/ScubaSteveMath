package controllers;

import play.*;
import play.mvc.*;

import views.html.*;

public class Application extends Controller {

    public static Result index() {
//        return ok(index.render("Your new application is ready."));
    	return ok("Hello world");
    }
    
//    public static Result hello() {
//    	Result result = new Result();
//    	  return ok("Hello world");
//    	}

}
