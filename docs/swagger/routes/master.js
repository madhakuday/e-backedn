module.exports = {
  "/admin/locales": {
    get: {
      tags: ["Master"],
      summary: "Get all locales",
      produces: ["application/json"],
      security: [
        {
          auth_token: [],
        },
      ],
      consumes: ["application/x-www-form-urlencoded"],
      parameters: [
        {
          name: "locale",
          in: "query",
          description: "language abbreviation",
          required: true,
          type: "string",
          example: "en",
        },
      ],
      responses: {
        200: {
          description: "locale list",
        },
      },
    },
  },

  "/master/languages": {
    get: {
      tags: ["Master"],
      summary: "Get all languages",
      produces: ["application/json"],
      security: [
        {
          auth_token: [],
        },
      ],
      consumes: ["application/x-www-form-urlencoded"],
      parameters: [
        {
          name: "search",
          in: "query",
          description: "search name",
          required: false,
          type: "string",
          example: "english",
        },
      ],
      responses: {
        200: {
          description: "language list",
        },
      },
    },
  },

  "/master/industry": {
    get: {
      tags: ["Master"],
      summary: "Get all industries",
      produces: ["application/json"],
      security: [
        {
          auth_token: [],
        },
      ],
      consumes: ["application/x-www-form-urlencoded"],
      parameters: [
        {
          name: "search",
          in: "query",
          description: "search name",
          required: false,
          type: "string",
          example: "telecommunication",
        },
        {
          name: "has_tree_view",
          in: "query",
          description: "1:tree view, 0: only industries",
          required: false,
          type: "string",
          example: "1",
        },
      ],
      responses: {
        200: {
          description: "industry list",
        },
      },
    },
  },

  "/master/domain": {
    get: {
      tags: ["Master"],
      summary: "Get all domains by industry",
      produces: ["application/json"],
      security: [
        {
          auth_token: [],
        },
      ],
      consumes: ["application/x-www-form-urlencoded"],
      parameters: [
        {
          name: "search",
          in: "query",
          description: "search name",
          required: false,
          type: "string",
          example: "telecommunication",
        },
        {
          name: "industry_id",
          in: "query",
          description: "search by industry id",
          required: false,
          type: "string",
          example: "1",
        },
      ],
      responses: {
        200: {
          description: "domain list",
        },
      },
    },
  },
  "/master/subdomain": {
    get: {
      tags: ["Master"],
      summary: "Get all subdomains by domain",
      produces: ["application/json"],
      security: [
        {
          auth_token: [],
        },
      ],
      consumes: ["application/x-www-form-urlencoded"],
      parameters: [
        {
          name: "search",
          in: "query",
          description: "search name",
          required: false,
          type: "string",
          example: "telecommunication",
        },
        {
          name: "domain_id",
          in: "query",
          description: "search by domain id",
          required: false,
          type: "string",
          example: "1",
        },
      ],
      responses: {
        200: {
          description: "subdomain list",
        },
      },
    },
  },
  "/master/profile": {
    get: {
      tags: ["Master"],
      summary: "Get all profile by industry",
      produces: ["application/json"],
      security: [
        {
          auth_token: [],
        },
      ],
      consumes: ["application/x-www-form-urlencoded"],
      parameters: [
        {
          name: "search",
          in: "query",
          description: "search name",
          required: false,
          type: "string",
          example: "telecommunication",
        },
        {
          name: "industry_id",
          in: "query",
          description: "search by industry id",
          required: false,
          type: "string",
          example: "1",
        },
      ],
      responses: {
        200: {
          description: "profile list",
        },
      },
    },
  },
  "/master/skill": {
    get: {
      tags: ["Master"],
      summary: "Get all skill by profile",
      produces: ["application/json"],
      security: [
        {
          auth_token: [],
        },
      ],
      consumes: ["application/x-www-form-urlencoded"],
      parameters: [
        {
          name: "search",
          in: "query",
          description: "search name",
          required: false,
          type: "string",
          example: "telecommunication",
        },
        {
          name: "profile_id",
          in: "query",
          description: "search by profile id",
          required: false,
          type: "string",
          example: "1",
        },
      ],
      responses: {
        200: {
          description: "skill list",
        },
      },
    },
  },
  "/master/service-mode": {
    get: {
      tags: ["Master"],
      summary: "Get all service modes",
      produces: ["application/json"],
      security: [
        {
          auth_token: [],
        },
      ],
      consumes: ["application/x-www-form-urlencoded"],
      parameters: [
        {
          name: "search",
          in: "query",
          description: "search name",
          required: false,
          type: "string",
          example: "english",
        },
      ],
      responses: {
        200: {
          description: "service modes list",
        },
      },
    },
  },
  "/master/milestone": {
    get: {
      tags: ["Master"],
      summary: "Get all milestone by service mode",
      produces: ["application/json"],
      security: [
        {
          auth_token: [],
        },
      ],
      consumes: ["application/x-www-form-urlencoded"],
      parameters: [
        {
          name: "search",
          in: "query",
          description: "search name",
          required: false,
          type: "string",
          example: "kick",
        },
        {
          name: "service_id",
          in: "query",
          description: "search by service id",
          required: false,
          type: "string",
          example: "1",
        },
      ],
      responses: {
        200: {
          description: "milestone list",
        },
      },
    },
  },

  "/master/profle-tool": {
    get: {
      tags: ["Master"],
      summary: "Get all tools by profile",
      produces: ["application/json"],
      security: [
        {
          auth_token: [],
        },
      ],
      consumes: ["application/x-www-form-urlencoded"],
      parameters: [
        {
          name: "search",
          in: "query",
          description: "search name",
          required: false,
          type: "string",
          example: "kick",
        },
        {
          name: "profile_id",
          in: "query",
          description: "search by service id",
          required: false,
          type: "string",
          example: "1",
        },
      ],
      responses: {
        200: {
          description: "profile tool list",
        },
      },
    },
  },

  "/master/avatar": {
    get: {
      tags: ["Master"],
      summary: "Get all avatars",
      produces: ["application/json"],
      security: [
        {
          auth_token: [],
        },
      ],
      consumes: ["application/x-www-form-urlencoded"],
      parameters: [
        {
          name: "search",
          in: "query",
          description: "search name",
          required: false,
          type: "string",
          example: "kick",
        },
      ],
      responses: {
        200: {
          description: "avatars list",
        },
      },
    },
  },
  "/master/addons": {
    get: {
      tags: ["Master"],
      summary: "Get all addons",
      produces: ["application/json"],
      security: [
        {
          auth_token: [],
        },
      ],
      consumes: ["application/x-www-form-urlencoded"],
      parameters: [
        {
          name: "search",
          in: "query",
          description: "search name",
          required: false,
          type: "string",
          example: "kick",
        },
        {
          name: "filtered",
          in: "query",
          description: "filter keys",
          required: false,
          type: "array",
          example: "[{'id':'addon_name','value':'ba'}]",
        },
      ],
      responses: {
        200: {
          description: "addons list",
        },
      },
    },
  },
};
