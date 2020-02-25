import IResourceType from "../interfaces/IResourceType";

export enum ResourceTypes {
	PEOPLE = 'people',
	STARSHIPS = 'starships'
}

export const ResourceTypesData:IResourceType[] = [
	{
		name: ResourceTypes.PEOPLE,
		apiEndpoint: 'people/',
		entriesCount: 0,
		winningStat: {
			name: "mass",
			displayName: "Mass"
		}
	},
	{
		name: ResourceTypes.STARSHIPS,
		apiEndpoint: 'starships/',
		entriesCount: 0,
		winningStat: {
			name: "crew",
			displayName: "Crew"
		}
	}
];
