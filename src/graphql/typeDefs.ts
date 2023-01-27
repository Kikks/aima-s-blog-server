import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Admin {
    id: ID!
    firstName: String!
    lastName: String!
    image: String
    email: String!
    createdAt: String
    updatedAt: String
  }

  type AdminLoginResponse {
    token: String!
    user: Admin!
  }

  input AdminInput {
    firstName: String!
    lastName: String!
    image: String
    email: String!
  }

  input AdminLoginInput {
    email: String!
    password: String!
  }

  input CreateAdminInput {
    firstName: String!
    lastName: String!
    image: String
    email: String
    password: String!
  }

  type User {
    id: ID!
    name: String!
    image: String
    email: String!
    createdAt: String
    updatedAt: String
  }

  input UserInput {
    name: String!
    image: String
    email: String!
  }

  type Category {
    id: ID!
    name: String!
    image: String
    createdAt: String
    updatedAt: String
  }

  input CategoryInput {
    name: String!
    image: String
  }

  type Comment {
    id: ID!
    body: String!
    post: ID!
    user: User!
    createdAt: String
    updatedAt: String
  }

  input CommentInput {
    body: String!
    post: ID!
    user: ID!
  }

  type Like {
    id: ID!
    post: ID!
    user: ID!
    createdAt: String
    updatedAt: String
  }

  input LikeInput {
    post: ID!
    user: ID!
  }

  type Post {
    id: ID!
    title: String!
    coverImage: String!
    preview: String!
    body: String!
    category: Category!
    likes: Int
    comments: Int
    isPublished: Boolean
    createdAt: String
    updatedAt: String
  }

  input PostInput {
    title: String!
    coverImage: String!
    preview: String!
    body: String!
    category: ID!
  }

  type Meta {
    currentPage: Int
    pages: Int
    total: Int
  }

  type PaginatedCategories {
    data: [Category]!
    meta: Meta
  }

  type PaginatedUsers {
    data: [User]!
    meta: Meta
  }

  type Query {
    getCategories(search: String, page: Int, limit: Int): PaginatedCategories!
    getUsers(search: String, page: Int, limit: Int): PaginatedUsers!
    getUser(id: ID!): User!
    getAdmin: Admin!
  }

  type Mutation {
    login: String!
    adminLogin(input: AdminLoginInput!): AdminLoginResponse!
    updateAdmin(input: AdminInput!): String!
    updateAdminPassword(password: String!): String!
    createCategory(input: CategoryInput!): Category!
    createAdmin(input: CreateAdminInput!): Admin!
    updateCategory(id: ID!, input: CategoryInput!): Category!
    deleteCategory(id: ID!): String!
  }
`;
