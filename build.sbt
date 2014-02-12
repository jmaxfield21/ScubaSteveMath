name := "ScubaSteveMath"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  javaJdbc,
  javaEbean,
  cache
) 
    
libraryDependencies += "mysql" % "mysql-connector-java" % "5.1.27"

play.Project.playJavaSettings
