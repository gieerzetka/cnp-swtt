import {Players} from "../../src/js/data/Players";
import {IPlayer} from "../../src/js/interfaces/IPlayer";
import PlayersUtils from "../../src/js/utils/PlayersUtils";

describe('PlayersUtilTests', () => {
	describe('generatePlayer', () => {
		it ('shouldReturn proper IPlayer object', () => {
			const playerName:Players = Players.PLAYER_1;
			const generatedPlayer:IPlayer = PlayersUtils.generatePlayer(playerName);

			expect(generatedPlayer.name).toEqual(playerName);
			expect(generatedPlayer.score).toEqual(0);
			expect(generatedPlayer.resource.id).toBeNull();
			expect(generatedPlayer.resource.type).toBeNull();
		});
	});
});

