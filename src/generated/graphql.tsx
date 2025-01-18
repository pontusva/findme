import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type ChatPartner = {
  __typename?: 'ChatPartner';
  partner: User;
  partnerId: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type FoundPet = {
  __typename?: 'FoundPet';
  description?: Maybe<Scalars['String']['output']>;
  finder: User;
  finderId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  location?: Maybe<Location>;
  locationId?: Maybe<Scalars['String']['output']>;
  photoMatches: Array<PhotoMatch>;
  photoUrl?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

export type Location = {
  __typename?: 'Location';
  address?: Maybe<Scalars['String']['output']>;
  foundPet?: Maybe<FoundPet>;
  foundPetId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  lostReport?: Maybe<LostPetReport>;
  lostReportId?: Maybe<Scalars['String']['output']>;
};

export type Logout = {
  __typename?: 'Logout';
  logout: Scalars['Boolean']['output'];
};

export type LostPetReport = {
  __typename?: 'LostPetReport';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  location?: Maybe<Location>;
  locationId?: Maybe<Scalars['String']['output']>;
  pet: Pet;
  petId: Scalars['String']['output'];
  photoMatches: Array<PhotoMatch>;
  reportedBy: Scalars['String']['output'];
  reporter: User;
  status: Scalars['String']['output'];
  statuses: Array<ReportStatus>;
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String']['output'];
  id: Scalars['String']['output'];
  receiverId: Scalars['String']['output'];
  senderId: Scalars['String']['output'];
};

export type Microchip = {
  __typename?: 'Microchip';
  chipNumber: Scalars['String']['output'];
  id: Scalars['String']['output'];
  pet: Pet;
  petId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChatPartner: ChatPartner;
  createLocation: Location;
  createLostPetReport: LostPetReport;
  createNotification: Notification;
  createPet?: Maybe<Pet>;
  createUser: User;
  deleteChatPartner: ChatPartner;
  login: AuthResponse;
  logout: Logout;
  sendMessage?: Maybe<Message>;
  updateLostPetReport: LostPetReport;
};


export type MutationCreateChatPartnerArgs = {
  partnerId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateLocationArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  foundPetId?: InputMaybe<Scalars['String']['input']>;
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  lostReportId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateLostPetReportArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  locationId?: InputMaybe<Scalars['String']['input']>;
  petId: Scalars['String']['input'];
  reportedBy: Scalars['String']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateNotificationArgs = {
  email: Scalars['String']['input'];
  message: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreatePetArgs = {
  age?: InputMaybe<Scalars['Int']['input']>;
  breed?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  microchipId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  ownerId: Scalars['String']['input'];
  photoUrl?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteChatPartnerArgs = {
  partnerId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSendMessageArgs = {
  content: Scalars['String']['input'];
  receiverId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
};


export type MutationUpdateLostPetReportArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  locationId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['String']['output'];
  message: Scalars['String']['output'];
  read: Scalars['Boolean']['output'];
  recipient?: Maybe<User>;
  sender?: Maybe<User>;
  senderId?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type NotificationsPayload = {
  __typename?: 'NotificationsPayload';
  latestNotifications: Array<Notification>;
  newNotification: Notification;
};

export type Pet = {
  __typename?: 'Pet';
  age?: Maybe<Scalars['Int']['output']>;
  breed?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  lostReports: Array<LostPetReport>;
  microchip?: Maybe<Microchip>;
  microchipId?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  owner?: Maybe<PetOwner>;
  ownerId: Scalars['String']['output'];
  photoUrl?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type PetOwner = {
  __typename?: 'PetOwner';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type PhotoMatch = {
  __typename?: 'PhotoMatch';
  foundPet: FoundPet;
  foundPetId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lostReport: LostPetReport;
  lostReportId: Scalars['String']['output'];
  similarity: Scalars['Float']['output'];
};

export type PushSubscription = {
  __typename?: 'PushSubscription';
  auth: Scalars['String']['output'];
  endpoint: Scalars['String']['output'];
  id: Scalars['String']['output'];
  p256dh: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllLostPetReports: Array<LostPetReport>;
  getAllLostPets: Array<LostPetReport>;
  getAllUsers: Array<User>;
  getChatMessages: Array<Message>;
  getChatPartners: Array<ChatPartner>;
  getFilteredPets: Array<Maybe<LostPetReport>>;
  getLostPetReport: LostPetReport;
  getPet: Pet;
  getPets: Array<Maybe<Pet>>;
  getUser: User;
  getUserPets: Array<Pet>;
  notifications: Array<Notification>;
};


export type QueryGetChatMessagesArgs = {
  chatId: Scalars['String']['input'];
};


export type QueryGetChatPartnersArgs = {
  userId: Scalars['String']['input'];
};


export type QueryGetFilteredPetsArgs = {
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetLostPetReportArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetPetArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserPetsArgs = {
  userId: Scalars['String']['input'];
};


export type QueryNotificationsArgs = {
  userId: Scalars['String']['input'];
};

export type ReportStatus = {
  __typename?: 'ReportStatus';
  id: Scalars['String']['output'];
  lostPetReport?: Maybe<LostPetReport>;
  note?: Maybe<Scalars['String']['output']>;
  reportId: Scalars['String']['output'];
  reportType: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedBy: Scalars['String']['output'];
  updater: User;
};

export type Subscription = {
  __typename?: 'Subscription';
  message?: Maybe<Message>;
  notifications?: Maybe<NotificationsPayload>;
};


export type SubscriptionMessageArgs = {
  chatId: Scalars['String']['input'];
};


export type SubscriptionNotificationsArgs = {
  userId: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  foundPets: Array<FoundPet>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  notifications: Array<Notification>;
  pets: Array<Pet>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  reports: Array<LostPetReport>;
  statusUpdates: Array<ReportStatus>;
};

export type CreateChatPartnerMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  partnerId: Scalars['String']['input'];
}>;


export type CreateChatPartnerMutation = { __typename?: 'Mutation', createChatPartner: { __typename?: 'ChatPartner', partnerId: string, userId: string } };

export type CreateLocationMutationVariables = Exact<{
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  foundPetId?: InputMaybe<Scalars['String']['input']>;
  lostReportId?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateLocationMutation = { __typename?: 'Mutation', createLocation: { __typename?: 'Location', address?: string, id: string, latitude: number, longitude: number } };

export type CreateLostPetReportMutationVariables = Exact<{
  petId: Scalars['String']['input'];
  reportedBy: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  locationId?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateLostPetReportMutation = { __typename?: 'Mutation', createLostPetReport: { __typename?: 'LostPetReport', id: string, reportedBy: string, pet: { __typename?: 'Pet', id: string, ownerId: string } } };

export type CreateNotificationMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  message: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
}>;


export type CreateNotificationMutation = { __typename?: 'Mutation', createNotification: { __typename?: 'Notification', id: string, message: string, read: boolean, userId: string } };

export type CreatePetMutationVariables = Exact<{
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  ownerId: Scalars['String']['input'];
  breed?: InputMaybe<Scalars['String']['input']>;
  age?: InputMaybe<Scalars['Int']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  photoUrl?: InputMaybe<Scalars['String']['input']>;
  microchipId?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreatePetMutation = { __typename?: 'Mutation', createPet?: { __typename?: 'Pet', id: string, name: string } };

export type GetAllLostPetsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllLostPetsQuery = { __typename?: 'Query', getAllLostPets: Array<{ __typename?: 'LostPetReport', id: string, status: string, location?: { __typename?: 'Location', address?: string, id: string }, pet: { __typename?: 'Pet', age?: number, breed?: string, description?: string, gender?: string, id: string, name: string, type: string, photoUrl?: string, owner?: { __typename?: 'PetOwner', email: string, id: string, name: string } } }> };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', email: string, id: string }> };

export type GetChatMessagesQueryVariables = Exact<{
  chatId: Scalars['String']['input'];
}>;


export type GetChatMessagesQuery = { __typename?: 'Query', getChatMessages: Array<{ __typename?: 'Message', content: string, id: string, senderId: string }> };

export type GetChatPartnersQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetChatPartnersQuery = { __typename?: 'Query', getChatPartners: Array<{ __typename?: 'ChatPartner', partnerId: string, userId: string, partner: { __typename?: 'User', name: string }, user: { __typename?: 'User', name: string } }> };

export type GetFilteredPetsQueryVariables = Exact<{
  searchTerm?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetFilteredPetsQuery = { __typename?: 'Query', getFilteredPets: Array<{ __typename?: 'LostPetReport', id: string, status: string, reportedBy: string, location?: { __typename?: 'Location', id: string, address?: string }, pet: { __typename?: 'Pet', id: string, name: string, type: string, breed?: string, photoUrl?: string, owner?: { __typename?: 'PetOwner', id: string, name: string, email: string } } }> };

export type GetLostPetReportQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetLostPetReportQuery = { __typename?: 'Query', getLostPetReport: { __typename?: 'LostPetReport', id: string, pet: { __typename?: 'Pet', id: string, ownerId: string, owner?: { __typename?: 'PetOwner', id: string } } } };

export type GetPetQueryVariables = Exact<{
  getPetId: Scalars['String']['input'];
}>;


export type GetPetQuery = { __typename?: 'Query', getPet: { __typename?: 'Pet', type: string, name: string, breed?: string, age?: number, photoUrl?: string, description?: string, owner?: { __typename?: 'PetOwner', name: string, id: string, email: string } } };

export type GetPetsForMapQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPetsForMapQuery = { __typename?: 'Query', getPets: Array<{ __typename?: 'Pet', lostReports: Array<{ __typename?: 'LostPetReport', location?: { __typename?: 'Location', latitude: number, longitude: number }, pet: { __typename?: 'Pet', id: string, name: string, type: string, photoUrl?: string, ownerId: string } }> }> };

export type GetUserPetsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUserPetsQuery = { __typename?: 'Query', getUserPets: Array<{ __typename?: 'Pet', type: string, id: string, name: string, photoUrl?: string, lostReports: Array<{ __typename?: 'LostPetReport', status: string }> }> };

export type MessageSubscriptionVariables = Exact<{
  chatId: Scalars['String']['input'];
}>;


export type MessageSubscription = { __typename?: 'Subscription', message?: { __typename?: 'Message', id: string, content: string, senderId: string } };

export type NotificationsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type NotificationsQuery = { __typename?: 'Query', notifications: Array<{ __typename?: 'Notification', id: string, message: string, senderId?: string, userId: string, sender?: { __typename?: 'User', email: string, name: string } }> };

export type NotificationsSubscriptionSubscriptionVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type NotificationsSubscriptionSubscription = { __typename?: 'Subscription', notifications?: { __typename?: 'NotificationsPayload', latestNotifications: Array<{ __typename?: 'Notification', id: string, message: string, userId: string, senderId?: string, sender?: { __typename?: 'User', name: string, email: string } }>, newNotification: { __typename?: 'Notification', message: string, id: string, userId: string, senderId?: string, sender?: { __typename?: 'User', name: string, email: string } } } };

export type SendMessageMutationVariables = Exact<{
  content: Scalars['String']['input'];
  receiverId: Scalars['String']['input'];
  senderId: Scalars['String']['input'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage?: { __typename?: 'Message', content: string, id: string, senderId: string } };


export const CreateChatPartnerDocument = gql`
    mutation CreateChatPartner($userId: String!, $partnerId: String!) {
  createChatPartner(userId: $userId, partnerId: $partnerId) {
    partnerId
    userId
  }
}
    `;
export type CreateChatPartnerMutationFn = Apollo.MutationFunction<CreateChatPartnerMutation, CreateChatPartnerMutationVariables>;

/**
 * __useCreateChatPartnerMutation__
 *
 * To run a mutation, you first call `useCreateChatPartnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatPartnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatPartnerMutation, { data, loading, error }] = useCreateChatPartnerMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      partnerId: // value for 'partnerId'
 *   },
 * });
 */
export function useCreateChatPartnerMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatPartnerMutation, CreateChatPartnerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatPartnerMutation, CreateChatPartnerMutationVariables>(CreateChatPartnerDocument, options);
      }
export type CreateChatPartnerMutationHookResult = ReturnType<typeof useCreateChatPartnerMutation>;
export type CreateChatPartnerMutationResult = Apollo.MutationResult<CreateChatPartnerMutation>;
export type CreateChatPartnerMutationOptions = Apollo.BaseMutationOptions<CreateChatPartnerMutation, CreateChatPartnerMutationVariables>;
export const CreateLocationDocument = gql`
    mutation CreateLocation($latitude: Float!, $longitude: Float!, $address: String, $foundPetId: String, $lostReportId: String) {
  createLocation(
    latitude: $latitude
    longitude: $longitude
    address: $address
    foundPetId: $foundPetId
    lostReportId: $lostReportId
  ) {
    address
    id
    latitude
    longitude
  }
}
    `;
export type CreateLocationMutationFn = Apollo.MutationFunction<CreateLocationMutation, CreateLocationMutationVariables>;

/**
 * __useCreateLocationMutation__
 *
 * To run a mutation, you first call `useCreateLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLocationMutation, { data, loading, error }] = useCreateLocationMutation({
 *   variables: {
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *      address: // value for 'address'
 *      foundPetId: // value for 'foundPetId'
 *      lostReportId: // value for 'lostReportId'
 *   },
 * });
 */
export function useCreateLocationMutation(baseOptions?: Apollo.MutationHookOptions<CreateLocationMutation, CreateLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLocationMutation, CreateLocationMutationVariables>(CreateLocationDocument, options);
      }
export type CreateLocationMutationHookResult = ReturnType<typeof useCreateLocationMutation>;
export type CreateLocationMutationResult = Apollo.MutationResult<CreateLocationMutation>;
export type CreateLocationMutationOptions = Apollo.BaseMutationOptions<CreateLocationMutation, CreateLocationMutationVariables>;
export const CreateLostPetReportDocument = gql`
    mutation CreateLostPetReport($petId: String!, $reportedBy: String!, $description: String, $locationId: String) {
  createLostPetReport(
    petId: $petId
    reportedBy: $reportedBy
    description: $description
    locationId: $locationId
  ) {
    id
    reportedBy
    pet {
      id
      ownerId
    }
  }
}
    `;
export type CreateLostPetReportMutationFn = Apollo.MutationFunction<CreateLostPetReportMutation, CreateLostPetReportMutationVariables>;

/**
 * __useCreateLostPetReportMutation__
 *
 * To run a mutation, you first call `useCreateLostPetReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLostPetReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLostPetReportMutation, { data, loading, error }] = useCreateLostPetReportMutation({
 *   variables: {
 *      petId: // value for 'petId'
 *      reportedBy: // value for 'reportedBy'
 *      description: // value for 'description'
 *      locationId: // value for 'locationId'
 *   },
 * });
 */
export function useCreateLostPetReportMutation(baseOptions?: Apollo.MutationHookOptions<CreateLostPetReportMutation, CreateLostPetReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLostPetReportMutation, CreateLostPetReportMutationVariables>(CreateLostPetReportDocument, options);
      }
export type CreateLostPetReportMutationHookResult = ReturnType<typeof useCreateLostPetReportMutation>;
export type CreateLostPetReportMutationResult = Apollo.MutationResult<CreateLostPetReportMutation>;
export type CreateLostPetReportMutationOptions = Apollo.BaseMutationOptions<CreateLostPetReportMutation, CreateLostPetReportMutationVariables>;
export const CreateNotificationDocument = gql`
    mutation CreateNotification($userId: String!, $name: String!, $email: String!, $phone: String!, $message: String!, $senderId: String!) {
  createNotification(
    userId: $userId
    name: $name
    email: $email
    phone: $phone
    message: $message
    senderId: $senderId
  ) {
    id
    message
    read
    userId
  }
}
    `;
export type CreateNotificationMutationFn = Apollo.MutationFunction<CreateNotificationMutation, CreateNotificationMutationVariables>;

/**
 * __useCreateNotificationMutation__
 *
 * To run a mutation, you first call `useCreateNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNotificationMutation, { data, loading, error }] = useCreateNotificationMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *      message: // value for 'message'
 *      senderId: // value for 'senderId'
 *   },
 * });
 */
export function useCreateNotificationMutation(baseOptions?: Apollo.MutationHookOptions<CreateNotificationMutation, CreateNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNotificationMutation, CreateNotificationMutationVariables>(CreateNotificationDocument, options);
      }
export type CreateNotificationMutationHookResult = ReturnType<typeof useCreateNotificationMutation>;
export type CreateNotificationMutationResult = Apollo.MutationResult<CreateNotificationMutation>;
export type CreateNotificationMutationOptions = Apollo.BaseMutationOptions<CreateNotificationMutation, CreateNotificationMutationVariables>;
export const CreatePetDocument = gql`
    mutation CreatePet($name: String!, $type: String!, $ownerId: String!, $breed: String, $age: Int, $gender: String, $description: String, $photoUrl: String, $microchipId: String) {
  createPet(
    name: $name
    type: $type
    ownerId: $ownerId
    breed: $breed
    age: $age
    gender: $gender
    description: $description
    photoUrl: $photoUrl
    microchipId: $microchipId
  ) {
    id
    name
  }
}
    `;
export type CreatePetMutationFn = Apollo.MutationFunction<CreatePetMutation, CreatePetMutationVariables>;

/**
 * __useCreatePetMutation__
 *
 * To run a mutation, you first call `useCreatePetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPetMutation, { data, loading, error }] = useCreatePetMutation({
 *   variables: {
 *      name: // value for 'name'
 *      type: // value for 'type'
 *      ownerId: // value for 'ownerId'
 *      breed: // value for 'breed'
 *      age: // value for 'age'
 *      gender: // value for 'gender'
 *      description: // value for 'description'
 *      photoUrl: // value for 'photoUrl'
 *      microchipId: // value for 'microchipId'
 *   },
 * });
 */
export function useCreatePetMutation(baseOptions?: Apollo.MutationHookOptions<CreatePetMutation, CreatePetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePetMutation, CreatePetMutationVariables>(CreatePetDocument, options);
      }
export type CreatePetMutationHookResult = ReturnType<typeof useCreatePetMutation>;
export type CreatePetMutationResult = Apollo.MutationResult<CreatePetMutation>;
export type CreatePetMutationOptions = Apollo.BaseMutationOptions<CreatePetMutation, CreatePetMutationVariables>;
export const GetAllLostPetsDocument = gql`
    query GetAllLostPets {
  getAllLostPets {
    id
    location {
      address
      id
    }
    status
    pet {
      age
      breed
      description
      gender
      id
      name
      type
      photoUrl
      owner {
        email
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetAllLostPetsQuery__
 *
 * To run a query within a React component, call `useGetAllLostPetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllLostPetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllLostPetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllLostPetsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllLostPetsQuery, GetAllLostPetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllLostPetsQuery, GetAllLostPetsQueryVariables>(GetAllLostPetsDocument, options);
      }
export function useGetAllLostPetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllLostPetsQuery, GetAllLostPetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllLostPetsQuery, GetAllLostPetsQueryVariables>(GetAllLostPetsDocument, options);
        }
export function useGetAllLostPetsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllLostPetsQuery, GetAllLostPetsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllLostPetsQuery, GetAllLostPetsQueryVariables>(GetAllLostPetsDocument, options);
        }
export type GetAllLostPetsQueryHookResult = ReturnType<typeof useGetAllLostPetsQuery>;
export type GetAllLostPetsLazyQueryHookResult = ReturnType<typeof useGetAllLostPetsLazyQuery>;
export type GetAllLostPetsSuspenseQueryHookResult = ReturnType<typeof useGetAllLostPetsSuspenseQuery>;
export type GetAllLostPetsQueryResult = Apollo.QueryResult<GetAllLostPetsQuery, GetAllLostPetsQueryVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  getAllUsers {
    email
    id
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export function useGetAllUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersSuspenseQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetChatMessagesDocument = gql`
    query GetChatMessages($chatId: String!) {
  getChatMessages(chatId: $chatId) {
    content
    id
    senderId
  }
}
    `;

/**
 * __useGetChatMessagesQuery__
 *
 * To run a query within a React component, call `useGetChatMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatMessagesQuery({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useGetChatMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables> & ({ variables: GetChatMessagesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>(GetChatMessagesDocument, options);
      }
export function useGetChatMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>(GetChatMessagesDocument, options);
        }
export function useGetChatMessagesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>(GetChatMessagesDocument, options);
        }
export type GetChatMessagesQueryHookResult = ReturnType<typeof useGetChatMessagesQuery>;
export type GetChatMessagesLazyQueryHookResult = ReturnType<typeof useGetChatMessagesLazyQuery>;
export type GetChatMessagesSuspenseQueryHookResult = ReturnType<typeof useGetChatMessagesSuspenseQuery>;
export type GetChatMessagesQueryResult = Apollo.QueryResult<GetChatMessagesQuery, GetChatMessagesQueryVariables>;
export const GetChatPartnersDocument = gql`
    query GetChatPartners($userId: String!) {
  getChatPartners(userId: $userId) {
    partner {
      name
    }
    user {
      name
    }
    partnerId
    userId
  }
}
    `;

/**
 * __useGetChatPartnersQuery__
 *
 * To run a query within a React component, call `useGetChatPartnersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatPartnersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatPartnersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetChatPartnersQuery(baseOptions: Apollo.QueryHookOptions<GetChatPartnersQuery, GetChatPartnersQueryVariables> & ({ variables: GetChatPartnersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChatPartnersQuery, GetChatPartnersQueryVariables>(GetChatPartnersDocument, options);
      }
export function useGetChatPartnersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChatPartnersQuery, GetChatPartnersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChatPartnersQuery, GetChatPartnersQueryVariables>(GetChatPartnersDocument, options);
        }
export function useGetChatPartnersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetChatPartnersQuery, GetChatPartnersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetChatPartnersQuery, GetChatPartnersQueryVariables>(GetChatPartnersDocument, options);
        }
export type GetChatPartnersQueryHookResult = ReturnType<typeof useGetChatPartnersQuery>;
export type GetChatPartnersLazyQueryHookResult = ReturnType<typeof useGetChatPartnersLazyQuery>;
export type GetChatPartnersSuspenseQueryHookResult = ReturnType<typeof useGetChatPartnersSuspenseQuery>;
export type GetChatPartnersQueryResult = Apollo.QueryResult<GetChatPartnersQuery, GetChatPartnersQueryVariables>;
export const GetFilteredPetsDocument = gql`
    query GetFilteredPets($searchTerm: String) {
  getFilteredPets(searchTerm: $searchTerm) {
    id
    status
    reportedBy
    location {
      id
      address
    }
    pet {
      id
      name
      type
      breed
      photoUrl
      owner {
        id
        name
        email
      }
    }
  }
}
    `;

/**
 * __useGetFilteredPetsQuery__
 *
 * To run a query within a React component, call `useGetFilteredPetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilteredPetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilteredPetsQuery({
 *   variables: {
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useGetFilteredPetsQuery(baseOptions?: Apollo.QueryHookOptions<GetFilteredPetsQuery, GetFilteredPetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilteredPetsQuery, GetFilteredPetsQueryVariables>(GetFilteredPetsDocument, options);
      }
export function useGetFilteredPetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilteredPetsQuery, GetFilteredPetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilteredPetsQuery, GetFilteredPetsQueryVariables>(GetFilteredPetsDocument, options);
        }
export function useGetFilteredPetsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFilteredPetsQuery, GetFilteredPetsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFilteredPetsQuery, GetFilteredPetsQueryVariables>(GetFilteredPetsDocument, options);
        }
export type GetFilteredPetsQueryHookResult = ReturnType<typeof useGetFilteredPetsQuery>;
export type GetFilteredPetsLazyQueryHookResult = ReturnType<typeof useGetFilteredPetsLazyQuery>;
export type GetFilteredPetsSuspenseQueryHookResult = ReturnType<typeof useGetFilteredPetsSuspenseQuery>;
export type GetFilteredPetsQueryResult = Apollo.QueryResult<GetFilteredPetsQuery, GetFilteredPetsQueryVariables>;
export const GetLostPetReportDocument = gql`
    query GetLostPetReport($id: String!) {
  getLostPetReport(id: $id) {
    id
    pet {
      id
      ownerId
      owner {
        id
      }
    }
  }
}
    `;

/**
 * __useGetLostPetReportQuery__
 *
 * To run a query within a React component, call `useGetLostPetReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLostPetReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLostPetReportQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetLostPetReportQuery(baseOptions: Apollo.QueryHookOptions<GetLostPetReportQuery, GetLostPetReportQueryVariables> & ({ variables: GetLostPetReportQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLostPetReportQuery, GetLostPetReportQueryVariables>(GetLostPetReportDocument, options);
      }
export function useGetLostPetReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLostPetReportQuery, GetLostPetReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLostPetReportQuery, GetLostPetReportQueryVariables>(GetLostPetReportDocument, options);
        }
export function useGetLostPetReportSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLostPetReportQuery, GetLostPetReportQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLostPetReportQuery, GetLostPetReportQueryVariables>(GetLostPetReportDocument, options);
        }
export type GetLostPetReportQueryHookResult = ReturnType<typeof useGetLostPetReportQuery>;
export type GetLostPetReportLazyQueryHookResult = ReturnType<typeof useGetLostPetReportLazyQuery>;
export type GetLostPetReportSuspenseQueryHookResult = ReturnType<typeof useGetLostPetReportSuspenseQuery>;
export type GetLostPetReportQueryResult = Apollo.QueryResult<GetLostPetReportQuery, GetLostPetReportQueryVariables>;
export const GetPetDocument = gql`
    query GetPet($getPetId: String!) {
  getPet(id: $getPetId) {
    type
    name
    breed
    age
    photoUrl
    description
    owner {
      name
      id
      email
    }
  }
}
    `;

/**
 * __useGetPetQuery__
 *
 * To run a query within a React component, call `useGetPetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPetQuery({
 *   variables: {
 *      getPetId: // value for 'getPetId'
 *   },
 * });
 */
export function useGetPetQuery(baseOptions: Apollo.QueryHookOptions<GetPetQuery, GetPetQueryVariables> & ({ variables: GetPetQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPetQuery, GetPetQueryVariables>(GetPetDocument, options);
      }
export function useGetPetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPetQuery, GetPetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPetQuery, GetPetQueryVariables>(GetPetDocument, options);
        }
export function useGetPetSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPetQuery, GetPetQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPetQuery, GetPetQueryVariables>(GetPetDocument, options);
        }
export type GetPetQueryHookResult = ReturnType<typeof useGetPetQuery>;
export type GetPetLazyQueryHookResult = ReturnType<typeof useGetPetLazyQuery>;
export type GetPetSuspenseQueryHookResult = ReturnType<typeof useGetPetSuspenseQuery>;
export type GetPetQueryResult = Apollo.QueryResult<GetPetQuery, GetPetQueryVariables>;
export const GetPetsForMapDocument = gql`
    query GetPetsForMap {
  getPets {
    lostReports {
      location {
        latitude
        longitude
      }
      pet {
        id
        name
        type
        photoUrl
        ownerId
      }
    }
  }
}
    `;

/**
 * __useGetPetsForMapQuery__
 *
 * To run a query within a React component, call `useGetPetsForMapQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPetsForMapQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPetsForMapQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPetsForMapQuery(baseOptions?: Apollo.QueryHookOptions<GetPetsForMapQuery, GetPetsForMapQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPetsForMapQuery, GetPetsForMapQueryVariables>(GetPetsForMapDocument, options);
      }
export function useGetPetsForMapLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPetsForMapQuery, GetPetsForMapQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPetsForMapQuery, GetPetsForMapQueryVariables>(GetPetsForMapDocument, options);
        }
export function useGetPetsForMapSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetPetsForMapQuery, GetPetsForMapQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetPetsForMapQuery, GetPetsForMapQueryVariables>(GetPetsForMapDocument, options);
        }
export type GetPetsForMapQueryHookResult = ReturnType<typeof useGetPetsForMapQuery>;
export type GetPetsForMapLazyQueryHookResult = ReturnType<typeof useGetPetsForMapLazyQuery>;
export type GetPetsForMapSuspenseQueryHookResult = ReturnType<typeof useGetPetsForMapSuspenseQuery>;
export type GetPetsForMapQueryResult = Apollo.QueryResult<GetPetsForMapQuery, GetPetsForMapQueryVariables>;
export const GetUserPetsDocument = gql`
    query getUserPets($userId: String!) {
  getUserPets(userId: $userId) {
    type
    lostReports {
      status
    }
    id
    name
    photoUrl
  }
}
    `;

/**
 * __useGetUserPetsQuery__
 *
 * To run a query within a React component, call `useGetUserPetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPetsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserPetsQuery(baseOptions: Apollo.QueryHookOptions<GetUserPetsQuery, GetUserPetsQueryVariables> & ({ variables: GetUserPetsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPetsQuery, GetUserPetsQueryVariables>(GetUserPetsDocument, options);
      }
export function useGetUserPetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPetsQuery, GetUserPetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPetsQuery, GetUserPetsQueryVariables>(GetUserPetsDocument, options);
        }
export function useGetUserPetsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserPetsQuery, GetUserPetsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserPetsQuery, GetUserPetsQueryVariables>(GetUserPetsDocument, options);
        }
export type GetUserPetsQueryHookResult = ReturnType<typeof useGetUserPetsQuery>;
export type GetUserPetsLazyQueryHookResult = ReturnType<typeof useGetUserPetsLazyQuery>;
export type GetUserPetsSuspenseQueryHookResult = ReturnType<typeof useGetUserPetsSuspenseQuery>;
export type GetUserPetsQueryResult = Apollo.QueryResult<GetUserPetsQuery, GetUserPetsQueryVariables>;
export const MessageDocument = gql`
    subscription Message($chatId: String!) {
  message(chatId: $chatId) {
    id
    content
    senderId
  }
}
    `;

/**
 * __useMessageSubscription__
 *
 * To run a query within a React component, call `useMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageSubscription({
 *   variables: {
 *      chatId: // value for 'chatId'
 *   },
 * });
 */
export function useMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<MessageSubscription, MessageSubscriptionVariables> & ({ variables: MessageSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<MessageSubscription, MessageSubscriptionVariables>(MessageDocument, options);
      }
export type MessageSubscriptionHookResult = ReturnType<typeof useMessageSubscription>;
export type MessageSubscriptionResult = Apollo.SubscriptionResult<MessageSubscription>;
export const NotificationsDocument = gql`
    query Notifications($userId: String!) {
  notifications(userId: $userId) {
    id
    message
    senderId
    userId
    sender {
      email
      name
    }
  }
}
    `;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables> & ({ variables: NotificationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export function useNotificationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsSuspenseQueryHookResult = ReturnType<typeof useNotificationsSuspenseQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const NotificationsSubscriptionDocument = gql`
    subscription NotificationsSubscription($userId: String!) {
  notifications(userId: $userId) {
    latestNotifications {
      id
      message
      userId
      senderId
      sender {
        name
        email
      }
    }
    newNotification {
      message
      id
      userId
      senderId
      sender {
        name
        email
      }
    }
  }
}
    `;

/**
 * __useNotificationsSubscriptionSubscription__
 *
 * To run a query within a React component, call `useNotificationsSubscriptionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsSubscriptionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsSubscriptionSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNotificationsSubscriptionSubscription(baseOptions: Apollo.SubscriptionHookOptions<NotificationsSubscriptionSubscription, NotificationsSubscriptionSubscriptionVariables> & ({ variables: NotificationsSubscriptionSubscriptionVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NotificationsSubscriptionSubscription, NotificationsSubscriptionSubscriptionVariables>(NotificationsSubscriptionDocument, options);
      }
export type NotificationsSubscriptionSubscriptionHookResult = ReturnType<typeof useNotificationsSubscriptionSubscription>;
export type NotificationsSubscriptionSubscriptionResult = Apollo.SubscriptionResult<NotificationsSubscriptionSubscription>;
export const SendMessageDocument = gql`
    mutation SendMessage($content: String!, $receiverId: String!, $senderId: String!) {
  sendMessage(content: $content, receiverId: $receiverId, senderId: $senderId) {
    content
    id
    senderId
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      content: // value for 'content'
 *      receiverId: // value for 'receiverId'
 *      senderId: // value for 'senderId'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;