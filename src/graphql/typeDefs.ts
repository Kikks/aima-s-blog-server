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
    description: String
    isFeatured: Boolean
    createdAt: String
    updatedAt: String
  }

  input CategoryInput {
    name: String!
    image: String
    description: String
  }

  type Comment {
    id: ID!
    body: String!
    post: ID
    comment: ID
    user: User!
    createdAt: String
    updatedAt: String
  }

  input CommentInput {
    body: String!
  }

  type Like {
    id: ID!
    post: ID
    comment: ID
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
    publishedAt: String
    createdAt: String
    updatedAt: String
  }

  type FeaturedPost {
    id: ID!
    post: Post!
    theme: Theme!
    index: Int!
    createdAt: String
    updatedAt: String
  }

  input PostInput {
    title: String!
    audio: String
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

  type CategoriesStats {
    category: Category!
    posts: Int!
  }

  type PaginatedCategoriesStats {
    data: [CategoriesStats]!
    meta: Meta
  }

  type PreviousAndNextPosts {
    prev: Post
    next: Post
  }

  type CountPostResponse {
    total: Int!
    published: Int!
    drafts: Int!
  }

  type LikesAndCommentCount {
    likes: Int!
    comments: Int!
  }

  type Query {
    countCategories: Int!
    getCategories(search: String, page: Int, limit: Int): PaginatedCategories!
    getCategoriesStats(search: String, page: Int, limit: Int): PaginatedCategoriesStats!
    getFeaturedCategories: [Category]!
    getCategory(id: ID!): Category!
    countUsers: Int!
    getUsers(search: String, page: Int, limit: Int): PaginatedUsers!
    getUser(id: ID!): User!
    countPosts: CountPostResponse!
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
    getUserLikeForComment(commentId: ID!): Like
    getComments(postId: ID!, limit: Int, page: Int): PaginatedComments!
    getCommentsForComment(commentId: ID!, limit: Int, page: Int): PaginatedComments!
    getCommentLikesAndCommentsCount(commentId: ID!): LikesAndCommentCount!
    getAdmin: Admin!
    getTheme(id: ID!): Theme!
    getThemes: [Theme]!
    getLatestTheme: Theme!
    getIsPostFeatured(postId: ID!): Boolean!
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
    featurePost(postId: ID!, themeId: ID!, index: Int): String!
    unfeaturePost(postId: ID!): String!
    featureCategory(id: ID!): String!
    unfeatureCategory(id: ID!): String!
    updatePost(id: ID!, input: PostInput!): String!
    deletePost(id: ID!): String!
    publishPost(id: ID!): String!
    unpublishPost(id: ID!): String!
    likePost(postId: ID!): String
    likeComment(commentId: ID!): String
    createComment(postId: ID!, input: CommentInput!): Comment!
    createCommentForComment(commentId: ID!, input: CommentInput!): Comment!
    updateComment(id: ID!, input: CommentInput!): String!
    deleteComment(id: ID!): String!
    createTheme(name: String!): Theme!
    deleteTheme(id: ID!): String!
  }
`;
