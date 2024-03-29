declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof AnyEntryMap> = AnyEntryMap[C][keyof AnyEntryMap[C]];

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"a-cautionary-tale-of-amazon-web-service-classes/index.md": {
	id: "a-cautionary-tale-of-amazon-web-service-classes/index.md";
  slug: "a-cautionary-tale-of-amazon-web-service-classes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"exploiting-github-actions/index.md": {
	id: "exploiting-github-actions/index.md";
  slug: "exploiting-github-actions";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"hatathon-2022/index.md": {
	id: "hatathon-2022/index.md";
  slug: "hatathon-2022";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"incorrect-reification/index.md": {
	id: "incorrect-reification/index.md";
  slug: "incorrect-reification";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"learning-to-code-with-projects/index.md": {
	id: "learning-to-code-with-projects/index.md";
  slug: "learning-to-code-with-projects";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"markdown-style-guide.md": {
	id: "markdown-style-guide.md";
  slug: "markdown-style-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"swe-job-primer.mdx": {
	id: "swe-job-primer.mdx";
  slug: "swe-job-primer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] };
"test-post-please-ignore/index.md": {
	id: "test-post-please-ignore/index.md";
  slug: "test-post-please-ignore";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"events": {
"a-combinatorial-problem-reed-nelson.mdx": {
	id: "a-combinatorial-problem-reed-nelson.mdx";
  slug: "a-combinatorial-problem-reed-nelson";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".mdx"] };
"cache-and-memory-friendly-programming-matt-wildman.mdx": {
	id: "cache-and-memory-friendly-programming-matt-wildman.mdx";
  slug: "cache-and-memory-friendly-programming-matt-wildman";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".mdx"] };
"common-pitfalls-of-machine-learning-in-quantitative-trading-shrey-shah.mdx": {
	id: "common-pitfalls-of-machine-learning-in-quantitative-trading-shrey-shah.mdx";
  slug: "common-pitfalls-of-machine-learning-in-quantitative-trading-shrey-shah";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".mdx"] };
"madhacks-fall-2023.mdx": {
	id: "madhacks-fall-2023.mdx";
  slug: "madhacks-fall-2023";
  body: string;
  collection: "events";
  data: InferEntrySchema<"events">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		"coordinators": {
"ben-lash": {
	id: "ben-lash";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"ben-wallen": {
	id: "ben-wallen";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"david-teather": {
	id: "david-teather";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"michael-berkey": {
	id: "michael-berkey";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"michael-gira": {
	id: "michael-gira";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"michael-noguera": {
	id: "michael-noguera";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"mihir-achyuta": {
	id: "mihir-achyuta";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"nick-winans": {
	id: "nick-winans";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"pranav-dronavalli": {
	id: "pranav-dronavalli";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"rudy-banerjee": {
	id: "rudy-banerjee";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
"sam-baumohl": {
	id: "sam-baumohl";
  collection: "coordinators";
  data: InferEntrySchema<"coordinators">
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
