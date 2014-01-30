package database;


public class DatabaseConnectorMocked {
	
	public DatabaseConnectorMocked(){
	}
	
	public static String query(String query){
		if(query != null){
			if(query.contains("admin status")){
				return "true";
			} else if (query.contains("username")){
				return "admin";
			} else if(query.contains("goodLogin")){
				return "admin";
			} else if(query.contains("badLogin")){
				return null;
			}
		}
			//Not a recommended error message in the final version of the product
			return "Add your own option if you want something so goddamn special";
	}
}
