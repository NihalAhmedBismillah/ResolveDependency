# ResolveDependency
Dependency Output function    Let’s consider a database schema migration scenario which database tables needs to be exported from one database and imported to some other database. The problem statement is that if a table A has a reference(foreign_key) to table B(primary_key). Table A can be imported only if table B is already imported.    Example    Consider “A”: [“B”] means “A” is dependent on “B” (A → B)  “B”: [“C”] means “B” is dependent on “C” (B → C)  Where “A”, “B” and “C” are database tables. In the above use case the output (import sequence) of the program will be [“C”, “B”, “A”].
# To run app ==> node app.js
# To run test ==> jest
