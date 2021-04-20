import { InMemoryCache } from "@apollo/client";
import { ORDER_ENUM } from "../../constants";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        launches: {
          keyArgs: false,
          merge(existing, incoming, { mergeObjects, cache: { identify } }) {
            if (!existing) return incoming;

            const ids = new Set([
              ...existing.map((ext) => identify(ext)),
              ...incoming.map((inc) => identify(inc)),
            ]);

            return [...ids].map((id) => {
              const existingRecord = existing.find(
                (ext) => identify(ext) === id
              );

              const incomingRecord = incoming.find(
                (inc) => identify(inc) === id
              );

              return !!incomingRecord
                ? mergeObjects(existingRecord, incomingRecord)
                : existingRecord;
            });
          },
          read(existing = [], { readField, args, variables }) {
            const { localOnly } = variables;

            let results = existing.filter((el) => {
              return !localOnly ? true : readField("isLocal", el);
            });

            if (args) {
              const {
                limit,
                offset,
                find: { mission_name },
                sort,
                order,
              } = args;

              // Pode ser feito pra praticamente todo filtro
              if (!!mission_name) {
                results = results.filter((result) => {
                  return readField("mission_name", result)
                    .toLowerCase()
                    .includes(mission_name.toLowerCase());
                });
              }

              results.sort((a, b) => {
                return readField(sort, a) >= readField(sort, b)
                  ? ORDER_ENUM[order].lower
                  : ORDER_ENUM[order].higher;
              });

              return limit ? results.slice(offset, offset + limit) : results;
            }

            return results;
          },
        },
        rockets: {
          keyArgs: false,
          read(existing = [], { readField, variables }) {
            const { filter } = variables;

            let results = [...existing].sort((a, b) => {
              return readField("name", a) > readField("name", b) ? 1 : 0;
            });

            if (!!filter) {
              results = results.filter((rocket) => {
                return readField("name", rocket)
                  .toLowerCase()
                  .includes(filter?.toLowerCase());
              });
            }
            return results;
          },
        },
      },
    },
    Launch: {
      keyFields: ["id", "launch_date_utc"],
      fields: {
        isLocal: {
          read(isLocal) {
            return !!isLocal || false;
          },
        },
      },
    },
    LaunchSite: {
      keyFields: ["site_id"],
    },
    RocketEngines: {
      keyFields: ["number"],
    },
  },
});
