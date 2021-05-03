// vi anvender tedious-modulet fra NPM
const {Connection, Request, TYPES} = require('tedious');
const config = require('./config.json');

var connection = new Connection(config)


// denne funktion vurderer om der er forbindelse til databasen
function startDB(){
    return new Promise((resolve, reject) => {
        connection.on('connect', (err) => {
            if(err) {
                console.log("Connection failed")
                reject(err)
                throw err;
            } else {
                console.log("Connection")
                resolve();
            }
        })
        connection.connect();
    })
}
// her bruger vi module.exports til at kalde funktionen i andre js-filer
module.exports.sqlConnection = connection;
module.exports.startDB = startDB;

// dette er vores funktion til at oprette en bruger i systemet
// vores input-parameter dækker over de informationer vi ønsker at sende til databasen
function insert(payload){
    console.log(payload.dob)
    return new Promise((resolve, reject) => {
        // vores query beregner endvidere datoen som en int ud fra vores dob-parameter
        const sql = `INSERT INTO [users].[user] (username, password, admin, email, firstname, lastname, gender, dob, bio, age)
        VALUES (@username, @password, @admin, @email, @firstname, @lastname, @gender, @dob, @bio, DATEDIFF(hour, @dob, GETDATE())/8766)`
        const request = new Request(sql, (err) => {
            if(err){
                reject(err)
                console.log(err)
            }
        });
        request.addParameter('username', TYPES.VarChar, payload.username)
        request.addParameter('password', TYPES.VarChar, payload.password)
        request.addParameter('admin', TYPES.Bit, 0)
        request.addParameter('email', TYPES.VarChar, payload.email)
        request.addParameter('firstname', TYPES.VarChar, payload.firstname)
        request.addParameter('lastname', TYPES.VarChar, payload.lastname)
        request.addParameter('gender', TYPES.VarChar, payload.gender)
        request.addParameter('dob', TYPES.Date, payload.dob)
        request.addParameter('bio', TYPES.VarChar, payload.bio)

        // hvis det er en succes, printer vi nedenstående for at vise, at vi har fået en bruger mere i vores db
        request.on('requestCompleted', (row) => {
            console.log('User inserted', row);
            resolve('user inserted', row)
        });
        connection.execSql(request)

    });
}
// her bruger vi module.exports til at kalde funktionen i andre js-filer
module.exports.insert = insert;

// dette er vores login funktion, som identificerer den pågældende bruger ud fra følgende to parametre: username og password
function select(username, password){
    return new Promise((resolve, reject) => {
        // her tjekker vi om inputs matcher med data vi har gemt i vores database
    const sql = 'SELECT * FROM [users].[user] where username = @username AND password = @password'
    const request = new Request(sql, (err, rowCount) => {
         if(err){
            reject(err)
            console.log(err)
        } else if (rowCount == 0) {
            reject({message: 'User does not exist'})}
        }
    );
    request.addParameter('username', TYPES.VarChar, username)
    request.addParameter('password', TYPES.VarChar, password)

    request.on('row', (columns) => {
        resolve(columns)
    });
    connection.execSql(request)})
    
}
// her bruger vi module.exports til at kalde funktionen i andre js-filer
module.exports.select = select;


function idSelect(id){
    return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM [users].[user] where id = @id'
    const request = new Request(sql, (err, rowCount) => {
         if(err){
            reject(err)
            console.log(err)
        } else if (rowCount == 0) {
            reject({message: 'User does not exist'})}
        }
    );
    request.addParameter('id', TYPES.Int, id)

    request.on('row', (columns) => {
        resolve(columns)
    });
    connection.execSql(request)})
    
}
// her bruger vi module.exports til at kalde funktionen i andre js-filer
module.exports.idSelect = idSelect;

// nedenstående er vores funktion, der bruges til at slette en profil
function idDelete(id){
    return new Promise((resolve, reject) => {
        // vi har anvendt id som parameter, når vi skal finde brugeren i databasen som vi ønsker at slette
    const sql = 'DELETE FROM [users].[user] where id = @id'
    const request = new Request(sql, (err, rowCount) => {
         if(err){
            reject(err)
            console.log(err)
            // hvis der ikke er nogen brugere med det pågældende id, printer vi en fejl, da vi hermed ikke kan slette en bruger
        } else if (rowCount == 0) {
            reject({message: 'Cannot delete profile - something went wrong'})}
        }
    );
    request.addParameter('id', TYPES.Int, id)

    //request.on('row', (columns) => {
        resolve("Profile has been deleted")
    //});
    connection.execSql(request)})
    
}
// her bruger vi module.exports til at kalde funktionen i andre js-filer
module.exports.idDelete = idDelete;

// denne funktion bruger vi til at opdatere en user
function idUpdate(id, payload){
    return new Promise((resolve, reject) => {
        // vi anvender id til at finde den bruger, som vi ønsker at opdatere
    const sql = 'UPDATE [users].[user] SET username =@username , email =@email, firstname =@firstname, lastname =@lastname, gender =@gender, dob =@dob, bio =@bio  WHERE id =@id'
    const request = new Request(sql, (err, rowCount) => {
         if(err){
            reject(err)
            console.log(err)
             // hvis der ikke er nogen brugere med det pågældende id, printer vi en fejl, da vi hermed ikke kan opdatere en bruger
        } else if (rowCount == 0) {
            reject({message: 'Cannot update profile - something went wrong'})}
        }
    );
    request.addParameter('username', TYPES.VarChar, payload.username)
    request.addParameter('email', TYPES.VarChar, payload.email)
    request.addParameter('firstname', TYPES.VarChar, payload.firstname)
    request.addParameter('lastname', TYPES.VarChar, payload.lastname)
    request.addParameter('gender', TYPES.VarChar, payload.gender)
    request.addParameter('dob', TYPES.Date, payload.dob)
    request.addParameter('bio', TYPES.VarChar, payload.bio)
    request.addParameter('id', TYPES.Int, id)

    //request.on('row', (columns) => {
        resolve("Profile has been updated")
    //});
    connection.execSql(request)})
    
}
// her bruger vi module.exports til at kalde funktionen i andre js-filer
module.exports.idUpdate = idUpdate;

// admin functions 
// denne funktion henter alle antallet af brugere og matches, der er i systemet
function showallStats(){
    return new Promise((resolve, reject) => {
        // her tæller vi antallet af rækker i hver tabel for at finde ud af, hvor mange brugere og matches der er
    const sql = 'SELECT(SELECT COUNT(*) FROM [users].[user]) AS users, (SELECT COUNT(*) FROM [users].[matchTable]) AS matches;'
    const request = new Request(sql, (err, rowCount) => {
         if(err){
            reject(err)
            console.log(err)
            // hvis ikke der er nogen rækker, får vi denne fejlbesked
        } else if (rowCount == 0) {
            reject({message: 'System does not have any users nor matches'})}
        }
    );
    request.on('row', (columns) => {
        resolve(columns)
    });
    connection.execSql(request)})
    
}
// her bruger vi module.exports til at kalde funktionen i andre js-filer
module.exports.showallStats = showallStats;


//select match
// denne funktion bruges til at finde potentielle matches
// vi benytter os af id, minAge, maxAge og gender, som parametre
// id bruges til at finde den user, der leder efter matches, mens minAge, maxAge og gender er vores søgekriterier
function selectMatch(id, minAge, maxAge, gender){
    return new Promise((resolve, reject) => {
        const sql = `SELECT TOP 1 * FROM (
            SELECT *
            FROM (
                     SELECT *
                     FROM users.match
                     WHERE users.match.id1 = @id
                 ) as m
                     RIGHT OUTER JOIN users.[user] as u
                                      ON u.id = m.id2
            WHERE u.id <> m.id2
               OR m.id1 IS NULL AND u.id <> @id AND @gender = gender AND age BETWEEN @minAge AND @maxAge
        ) as t1
ORDER BY NEWID()`
        const request = new Request(sql, (err, rowCount) => {
            if(err){
                reject(err)
                console.log(err)
            } else if (rowCount == 0) {
                reject({message: 'No more matches'})}
        });
        request.addParameter('id', TYPES.Int, id)
        request.addParameter('minAge', TYPES.Int, minAge)
        request.addParameter('maxAge', TYPES.Int, maxAge)
        request.addParameter('gender', TYPES.VarChar, gender)

        request.on('row', (columns) => {
            resolve(columns)
        });
        connection.execSql(request)

    });
}
// her bruger vi module.exports til at kalde funktionen i andre js-filer
module.exports.selectMatch = selectMatch;

// dette er vores like og dislike funktion, hvor vi indsætter like eller dislike ind i vores match tabel
function insertOpinion(payload){
    return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO [users].[match] (id1, status, id2) VALUES (@id1, @userStatus, @id2)'
    const request = new Request(sql, (err) => {
         if(err){
            reject(err)
            console.log(err)
        }
    });
    request.addParameter('id1', TYPES.Int, payload.id1)
    request.addParameter('userStatus', TYPES.Bit, payload.userStatus)
    request.addParameter('id2', TYPES.Int, payload.id2)
    
    // hvis det lykkes, sender vi den kode afsted
    request.on('requestCompleted', (row) => {
        resolve('user inserted', row)
    })
    connection.execSql(request)})
    
}
// her bruger vi module.exports til at kalde funktionen i andre js-filer
module.exports.insertOpinion = insertOpinion;

// denne funktion bruges til at vurdere om to brugere har et match
function determineMatch(id1, id2){
    return new Promise((resolve, reject) => {
        // her tjekker vi vores match tabel om de pågældende id-parametre er at finde samt status = 1
    const sql = 'SELECT * FROM users.match WHERE status = 1 AND (id1 = @id1 AND id2 = @id2 OR id1 = @id2 AND id2 = @id1)'
    const request = new Request(sql, (err, rowCount) => {
         if(err){
            reject(err)
            console.log(err)
            // hvis der ikke er to brugere, der har liket hinanden - altså to rækker i tabellen, får vi en fejl
        } else if (rowCount != 2) {
            reject({message: 'No match'})}
        }
    );
    request.addParameter('id1', TYPES.Int, id1)
    request.addParameter('id2', TYPES.Int, id2)
        // denne kode eksekveres, hvis der er succes og to brugere, der har liket hinanden
    request.on('requestCompleted', (row) => {
        resolve('Succes', row)
    });
    connection.execSql(request)})   
}
// her bruger vi module.exports til at kalde funktionen i andre js-filer
module.exports.determineMatch = determineMatch;

// hvis der er tale om et match, indsættes dette i vores matchTable. Dette udfører nedenstående funktion
function insertMatch(id1, id2){
    return new Promise((resolve, reject) => {
        // her hentes id fra de to pågældende brugere, der matcher
    const sql = 'INSERT INTO [users].[matchTable] (id1, id2) VALUES (@id1, @id2)'
    const request = new Request(sql, (err) => {
         if(err){
            reject(err)
            console.log(err)
        }
    });
    request.addParameter('id1', TYPES.Int, id1)
    request.addParameter('id2', TYPES.Int, id2)
    // lykkes ovenstående, ekseveres nedenstående
    request.on('requestCompleted', (row) => {
        resolve('Match inserted', row)
    })
    connection.execSql(request)})
    
}
// her bruger vi module.exports til at kalde funktionen i andre js-filer
module.exports.insertMatch = insertMatch;

// her anvender vi en funktion, der opdaterer alderen for brugerne, som anvender systemet, ud fra dob-parameteren
// her tjekker vi ved hjælp af vores username for at finde brugeren i databasen
function ageUpdate(username){
    return new Promise((resolve, reject) => {
    const sql = `UPDATE users.[user]
    SET age = DATEDIFF(hour, users.[user].dob, GETDATE())/8766
    WHERE username = @username`
    const request = new Request(sql, (err, rowCount) => {
         if(err){
            reject(err)
            console.log(err)
            // hvis der ikke er nogen rækker, får vi nedenstående fejl, idet der ikke er nogen brugere så
        } else if (rowCount == 0) {
            reject({message: 'Cannot update profile - something went wrong'})}
        }
    );
    request.addParameter('username', TYPES.VarChar, username)

        resolve("Profile has been updated")

    connection.execSql(request)})
    
}
// her bruger vi module.exports til at kalde funktionen i andre js-filer
module.exports.ageUpdate = ageUpdate;

function showMatches(id){
    return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users.[matchTable] WHERE id1 = @id OR id2 = @id'
    const request = new Request(sql, (err, rowCount) => {
         if(err){
            reject(err)
            console.log(err)
            // hvis ikke der er nogen rækker, får vi denne fejlbesked
        } else if (rowCount == 0) {
            reject({message: 'System does not have any matches'})}
        }
    );
    request.addParameter('id', TYPES.Int, id)

    request.on('row', (columns) => {
        resolve(columns)
    });
    connection.execSql(request)})
    
}
// her bruger vi module.exports til at kalde funktionen i andre js-filer
module.exports.showMatches = showMatches;
