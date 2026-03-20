import { pgTable, text, timestamp, varchar, integer, numeric } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: text('id').primaryKey(), // Authing user ID
  email: text('email'),
  phone: text('phone'),
  name: text('name'),
  avatar: text('avatar'),
  provider: varchar('provider', { length: 50 }), // wechat, qq, alipay, google, github, email
  country: varchar('country', { length: 10 }), // CN, US, etc. (IP at registration)
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export const companies = pgTable('companies', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  companyName: text('company_name').notNull(),
  jurisdiction: text('jurisdiction').notNull(),
  businessType: varchar('business_type', { length: 50 }).notNull(),
  industry: text('industry'),
  directors: varchar('directors', { length: 10 }).default('1'),
  contactEmail: text('contact_email').notNull(),
  contactPhone: text('contact_phone'),
  status: varchar('status', { length: 20 }).default('pending'), // pending | active | complete
  progress: integer('progress').default(0),
  registrationNumber: text('registration_number'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type Company = typeof companies.$inferSelect
export type NewCompany = typeof companies.$inferInsert

export const affiliateApplications = pgTable('affiliate_applications', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull(),
  website: text('website'),
  how: text('how'), // how they plan to promote
  status: varchar('status', { length: 20 }).default('pending'), // pending | approved | rejected
  createdAt: timestamp('created_at').defaultNow(),
})

export type AffiliateApplication = typeof affiliateApplications.$inferSelect

export const contactSubmissions = pgTable('contact_submissions', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  email: text('email').notNull(),
  company: text('company'),
  inquiryType: text('inquiry_type'),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export type ContactSubmission = typeof contactSubmissions.$inferSelect

// ─── Affiliates ───────────────────────────────────────────────────────────────

export const affiliates = pgTable('affiliates', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  applicationId: text('application_id').references(() => affiliateApplications.id),
  email: text('email').notNull(),
  name: text('name').notNull(),
  referralCode: text('referral_code').notNull().unique(), // e.g. ATLAS-DS7K2
  parentAffiliateId: text('parent_affiliate_id'), // for sales team hierarchy
  status: varchar('status', { length: 20 }).default('active'), // active | suspended
  joinedAt: timestamp('joined_at').defaultNow(),
})

export type Affiliate = typeof affiliates.$inferSelect

export const affiliateReferrals = pgTable('affiliate_referrals', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  affiliateId: text('affiliate_id').references(() => affiliates.id).notNull(),
  referredUserId: text('referred_user_id').references(() => users.id),
  companyId: text('company_id').references(() => companies.id),
  transactionAmount: numeric('transaction_amount', { precision: 10, scale: 2 }),
  commissionAmount: numeric('commission_amount', { precision: 10, scale: 2 }),
  commissionRate: numeric('commission_rate', { precision: 4, scale: 2 }), // 0.15 or 0.05
  type: varchar('type', { length: 10 }).default('direct'), // direct | team
  status: varchar('status', { length: 20 }).default('pending'), // pending | paid
  createdAt: timestamp('created_at').defaultNow(),
})

export type AffiliateReferral = typeof affiliateReferrals.$inferSelect

export const affiliatePayoutRequests = pgTable('affiliate_payout_requests', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  affiliateId: text('affiliate_id').references(() => affiliates.id).notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  method: varchar('method', { length: 20 }).notNull(), // wire | paypal | usdc | btc
  accountDetails: text('account_details').notNull(),
  status: varchar('status', { length: 20 }).default('pending'), // pending | processing | paid
  createdAt: timestamp('created_at').defaultNow(),
})

export type AffiliatePayoutRequest = typeof affiliatePayoutRequests.$inferSelect

// ─── Influencer Program ───────────────────────────────────────────────────────

export const influencerLinks = pgTable('influencer_links', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  affiliateId: text('affiliate_id').references(() => affiliates.id, { onDelete: 'cascade' }).notNull(),
  platform: varchar('platform', { length: 30 }).notNull(), // instagram | youtube | tiktok | twitter | twitch | linkedin
  handle: text('handle').notNull(),
  url: text('url'),
  followersCount: integer('followers_count'),
  status: varchar('status', { length: 20 }).default('active'), // active | pending | rejected
  createdAt: timestamp('created_at').defaultNow(),
})

export type InfluencerLink = typeof influencerLinks.$inferSelect

export const influencerDiscountCodes = pgTable('influencer_discount_codes', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  affiliateId: text('affiliate_id').references(() => affiliates.id, { onDelete: 'cascade' }).notNull().unique(),
  code: text('code').notNull().unique(), // e.g. DS7K210OFF
  discountPct: integer('discount_pct').default(10),
  timesUsed: integer('times_used').default(0),
  totalDiscounted: numeric('total_discounted', { precision: 10, scale: 2 }).default('0'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type InfluencerDiscountCode = typeof influencerDiscountCodes.$inferSelect

// ─── Trademark Applications ───────────────────────────────────────────────────

export const trademarkApplications = pgTable('trademark_applications', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  brandName: text('brand_name').notNull(),
  niceClasses: text('nice_classes'), // comma-separated class numbers
  countries: text('countries'),      // comma-separated country names
  email: text('email').notNull(),
  status: varchar('status', { length: 20 }).default('pending'), // pending | in_review | filed
  createdAt: timestamp('created_at').defaultNow(),
})

export type TrademarkApplication = typeof trademarkApplications.$inferSelect

// ─── Payments ─────────────────────────────────────────────────────────────────

export const payments = pgTable('payments', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  companyId: text('company_id').references(() => companies.id),
  airwallexIntentId: text('airwallex_intent_id').unique(),
  airwallexPaymentId: text('airwallex_payment_id'),
  amount: integer('amount').notNull(), // in cents
  currency: varchar('currency', { length: 10 }).default('usd'),
  status: varchar('status', { length: 20 }).default('pending'), // pending | paid | failed | refunded
  createdAt: timestamp('created_at').defaultNow(),
})

export type Payment = typeof payments.$inferSelect
