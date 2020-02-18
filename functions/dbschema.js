claims = {
	member: true, // can read, write
	forumModerator: true, // read, write + delete forum messages & topics
	calendarModerator: true, // read, write + delete calendar entries
	newsModerator: true, // read, write + delete new articles
	groupsModerator: true, // read, write + delete group messages & docs etc
	docsModerator: true, // read, write + delete documents
	admin: true, // read, write, delete + almost anything else
	superAdmin: true, // same as admin + edit, ban, delete users
};

storageBucket = {
	avatars: [
		uid.png,
		uid.jpg,
		uid.gif,
	],
	images: [],
	docs: [],
};

users = [
	{
		bio: 'Hello, my name is Phill, nice to meet you',
		createdOn: '2019-03-15T10:59:52.798Z',
		emailAddress: 'user@email.com',
		firstName: 'Phill',
		avatarUrl: 'avatars/dh23ggj5h32g543j5gf43.png',
		lastName: 'Jenkins',
		location: 'York, UK',
		uniqueName: 'Phrantick',
		uid: 'dh23ggj5h32g543j5gf43',
	},
];

const category = {
	categoryId: 'dh23ggj5h32g543j5gf43',
	title: 'some title',
	itemType: 'topic | doc',
	itemCount: 2,
	createdBy: 'userHandle',
	createdOn: '2019-03-15T10:59:52.798Z',
};
const topic = {
	topicId: 'dh23ggj5h32g543j5gf43',
	title: 'some title',
	description: 'brief description',
	createdBy: 'userHandle',
	createdOn: '2019-03-15T10:59:52.798Z',
	likeCount: 0,
};
const message = {
	messageId: 'dh23ggj5h32g543j5gf43',
	topicId: 'dh23ggj5h32g543j5gf43',
	body: 'This is a sample message',
	createdBy: 'userHandle',
	createdOn: '2019-03-15T10:59:52.798Z',
	likeCount: 5,
	commentCount: 3,
};
const comment = {
	commentId: 'dh23ggj5h32g543j5gf43',
	targetType: 'message | event | document | article',
	targetId: 'kdjsfgdksuufhgkdsufky',
	body: 'nice one mate!',
	createdBy: 'userHandle',
	createdOn: '2019-03-15T10:59:52.798Z',
};

const group = {
	groupId: 'kdjsfgdksuufhgkdsufky',
	title: 'Derwenthorpe Residents Association: Core Team',
	abbrev: 'DRA: Core Team',
	members: [
		{
			userId: 'kdjsfgdksuufhgkdsufky',
			uniqueName: 'Phrantick',
			avatarUrl: 'avatars/kdjsfgdksuufhgkdsufky.jpg',
		},
	],
	calendarId: 'kdjsfgdksuufhgkdsufky',
	createdBy: {
		userId: 'kdjsfgdksuufhgkdsufky',
		uniqueName: 'Phrantick',
		avatarUrl: 'avatars/kdjsfgdksuufhgkdsufky.jpg',
	},
	createdOn: '2019-03-15T10:59:52.798Z'
};

const calendar = {
	calendarId: 'kdjsfgdksuufhgkdsufky',
	createdBy: {
		userId: 'kdjsfgdksuufhgkdsufky',
		uniqueName: 'Phrantick',
		avatarUrl: 'avatars/kdjsfgdksuufhgkdsufky.jpg',
	},
	createdOn: '2019-03-15T10:59:52.798Z',
};

const event = {
	eventId: 'kdjsfgdksuufhgkdsufky',
	calendarId: 'kdjsfgdksuufhgkdsufky',
	createdBy: {
		userId: 'kdjsfgdksuufhgkdsufky',
		uniqueName: 'Phrantick',
		avatarUrl: 'avatars/kdjsfgdksuufhgkdsufky.jpg',
	},
	createdOn: '2019-03-15T10:59:52.798Z',
};

const article = {
	articleId: 'kdjsfgdksuufhgkdsufky',
	title: 'Boxing Day Walk',
	featuredImageId: 'some id',
	excerpt: 'brief text',
	content: 'all the text content',
	createdBy: {
		userId: 'kdjsfgdksuufhgkdsufky',
		uniqueName: 'Phrantick',
		avatarUrl: 'avatars/kdjsfgdksuufhgkdsufky.jpg',
	},
	createdOn: '2019-03-15T10:59:52.798Z',
};

const doc = {};
const image = {};

const subscription = {
	subscriptionId: 'kdjsfgdksuufhgkdsufky',
	subscribedToType: 'topic | group | event',
	subscribedToId: 'kdjsfgdksuufhgkdsufky',
	createdBy: {
		userId: 'kdjsfgdksuufhgkdsufky',
		uniqueName: 'Phrantick',
		avatarUrl: 'avatars/kdjsfgdksuufhgkdsufky.jpg',
	},
	createdOn: '2019-03-15T10:59:52.798Z',
};

const notification = {
	notificationId: 'kdjsfgdksuufhgkdsufky',
	recipient: 'Phrantick',
	hasSeen: 'true | false',
	sourceType: 'topic | group | event',
	sourceId: 'kdjsfgdksuufhgkdsufky',
	createdBy: {
		userId: 'kdjsfgdksuufhgkdsufky',
		uniqueName: 'Phrantick',
		avatarUrl: 'avatars/kdjsfgdksuufhgkdsufky.jpg',
	},
	createdOn: '2019-03-15T10:59:52.798Z'
};
