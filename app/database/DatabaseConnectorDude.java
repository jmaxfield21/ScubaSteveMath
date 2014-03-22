package database;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import play.db.DB;
import scalaz.std.effect.sql.statement;

public class DatabaseConnectorDude {

	public DatabaseConnectorDude(){
	}

	//userInputArgs is here to prevent SQL injection
	public static ResultSet query(String query, List<String> userInputArgs){
		PreparedStatement statement = null;
		Connection connection = DB.getConnection(false);
		ResultSet result = null;
		try {
			statement = connection.prepareStatement(query);
			for(int i = 0; i < userInputArgs.size(); i++){
				statement.setString(i, userInputArgs.get(i));
			}
			
			result = statement.executeQuery();
			connection.commit();
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		
		return result;
	}

	public static ResultSet insert(String query){
		Statement statement = null;
		Connection connection = DB.getConnection(false);
		ResultSet result = null;

		try {
			statement = connection.createStatement();
			statement.executeUpdate(query);
			connection.commit();
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
	}

	public static List<String> getStringsFromResultSet(ResultSet result) throws SQLException {

		List<String> stringyThingies = new ArrayList<String>();

		while(result.next()){
			int columns = result.getMetaData().getColumnCount();
			for(int i = 1; i <= columns; i++){
				String resultString = result.getString(i);
				if(resultString != null){
					stringyThingies.add(resultString.trim());
				}
			}
		}

		return stringyThingies;
	}

	public static List<Boolean> getBooleansFromResultSet(ResultSet result) throws SQLException {

		List<Boolean> bools = new ArrayList<Boolean>();

		while(result.next()){
			int columns = result.getMetaData().getColumnCount();
			for(int i = 1; i <= columns; i++){
				bools.add(new Boolean(result.getBoolean(i)));
			}
		}

		return bools;
	}

	public static List<Double> getDoublesFromResultSet(ResultSet result) throws SQLException {

		List<Double> doubles = new ArrayList<Double>();

		while(result.next()){
			int columns = result.getMetaData().getColumnCount();
			for(int i = 1; i <= columns; i++){
				doubles.add(new Double(result.getDouble(i)));
			}
		}

		return doubles;
	}

	public static List<Integer> getIntegersFromResultSet(ResultSet result) throws SQLException {

		List<Integer> integers = new ArrayList<Integer>();

		while(result.next()){
			int columns = result.getMetaData().getColumnCount();
			for(int i = 1; i <= columns; i++){
				integers.add(new Integer(result.getInt(i)));
			}
		}

		return integers;
	}

	public static List<Timestamp> getTimestampFromResultSet(ResultSet result) throws SQLException {

		List<Timestamp> doubles = new ArrayList<Timestamp>();

		while(result.next()){
			int columns = result.getMetaData().getColumnCount();
			for(int i = 1; i <= columns; i++){
				doubles.add(result.getTimestamp(i));
			}
		}

		return doubles;
	}
}
