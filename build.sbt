name := "ScubaSteveMath"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  javaJdbc,
  javaEbean,
  cache
) 
    
libraryDependencies += "mysql" % "mysql-connector-java" % "5.1.27"

libraryDependencies += "com.jolbox" % "bonecp" % "0.8.0-rc3"

play.Project.playJavaSettings
