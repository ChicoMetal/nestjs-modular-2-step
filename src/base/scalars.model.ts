// import { GraphQLScalarType, Kind } from 'graphql';

// export const DateTime = new GraphQLScalarType({
//   name: 'DateTime',
//   description: 'Represents a date time object',
//   serialize(value: Date) {
//     return value.toISOString();
//   },
//   parseValue(value: number) {
//     return new Date(value);
//   },
//   parseLiteral(ast) {
//     if (ast.kind === Kind.INT) {
//       return new Date(parseInt(ast.value, 10));
//     }
//     return null;
//   },
// });
