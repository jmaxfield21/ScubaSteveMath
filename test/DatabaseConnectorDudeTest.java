import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.Test;
import org.springframework.util.Assert;

import database.DatabaseConnectorDude;


public class DatabaseConnectorDudeTest {

	@Test
	public void testReturnsMultipleStrings() {
		List<String> strings = new ArrayList<String>();
		try {
			strings = DatabaseConnectorDude.getStringsFromResultSet(DatabaseConnectorDude.query("select username from ?;",Arrays.asList("login")));
		} catch (SQLException e) {
			e.printStackTrace();
		}
		Assert.isTrue(strings.size() > 1);
	}

}
