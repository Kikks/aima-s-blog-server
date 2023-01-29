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

  type Theme {
    id: ID!
    name: String!
    createdAt: String
    updatedAt: String
  }

  type Post {
    id: ID!
    title: String!
    audio: String
    slug: String!
    coverImage: String!
    preview: String!
    body: String!
    category: Category!
    isPublished: Boolean
    createdAt: String
    updatedAt: String
  }

  type FeaturedPost {
    id: ID!
    post: Post!
    theme: Theme!
    createdAt: String
    updatedAt: String
  }

  input PostInput {
    title: String!
    coverImage: String!
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

  type PaginatedPosts {
    data: [Post]!
    meta: Meta
  }

  type SinglePostResponse {
    post: Post!
    comments: Int!
    likes: Int!
  }

  type PaginatedComments {
    data: [Comment]!
    meta: Meta
  }

  type PreviousAndNextPosts {
    prev: Post
    next: Post
  }

  type Query {
    getCategories(search: String, page: Int, limit: Int): PaginatedCategories!
    getCategory(id: ID!): Category!
    getUsers(search: String, page: Int, limit: Int): PaginatedUsers!
    getUser(id: ID!): User!
    getPosts(
      search: String
      page: Int
      limit: Int
      category: ID
      sortBy: String
      order: String
    ): PaginatedPosts!
    getAllPosts(
      search: String
      page: Int
      limit: Int
      category: ID
      isPublished: Boolean
      sortBy: String
      order: String
    ): PaginatedPosts!
    getPost(slug: String!): SinglePostResponse!
    getPreviousAndNextPosts(postId: ID!): PreviousAndNextPosts!
    getFeaturedPosts: [FeaturedPost]!
    adminGetPost(id: ID!): SinglePostResponse!
    getUserLikeForPost(postId: ID!): Like
    getComments(postId: ID!): PaginatedComments!
    getAdmin: Admin!
    getTheme(id: ID!): Theme!
    getThemes: [Theme]!
  }

  type Mutation {
    login: User!
    deleteAccount: String!
    adminLogin(input: AdminLoginInput!): AdminLoginResponse!
    createAdmin(input: CreateAdminInput!): Admin!
    updateAdmin(input: AdminInput!): String!
    updateAdminPassword(password: String!): String!
    createCategory(input: CategoryInput!): Category!
    updateCategory(id: ID!, input: CategoryInput!): String!
    deleteCategory(id: ID!): String!
    createPost(input: PostInput!): Post!
    featurePost(postId: ID!, themeId: ID!): String!
    unfeaturePost(id: ID!): String!
    updatePost(id: ID!, input: PostInput!): String!
    deletePost(id: ID!): String!
    publishPost(id: ID!): String!
    likePost(postId: ID!): String
    createComment(postId: ID!, input: CommentInput!): Comment!
    updateComment(id: ID!, input: CommentInput!): String!
    deleteComment(id: ID!): String!
    createTheme(name: String!): Theme!
    deleteTheme(id: ID!): String!
  }
`;
