name := "ScubaSteveMath"

version := "1.0-SNAPSHOT"

libraryDependencies ++= Seq(
  javaJdbc,
  javaEbean,
  cache
)     

val appDependencies = Seq(
  "mysql" % "mysql-connector-java" % "5.1.21"
)

play.Project.playJavaSettings
