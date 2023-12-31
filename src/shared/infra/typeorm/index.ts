import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

// getConnectionOptions().then(options => {
//   const newOptions = options as IOptions;
//   newOptions.host = 'database_cars'; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
//   createConnection({
//     ...options,
//   });
// });

export default async(host = "database_cars"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  
  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database: 
        process.env.NODE_ENV === "test" 
        ? "cars_test" 
        : defaultOptions.database,
     })
  );
}