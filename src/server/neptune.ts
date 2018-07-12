/**
 * This file is partially generated; only edit bespoke sections.
 *
 * SOURCE<<gen/server.ts::Neptune>>
 * BESPOKE<<neptune>>
 * SIGNED<<nOlimrt839ENNm8TMbTA8w98ztf0unb/75FccZIPXmBPl8a10p9qJ90J+OdihON1RhP8yiAT26fRwmNpoNYPyQ==>>
 */

/* BESPOKE START <<neptune>> */
import gremlin from "gremlin";

let neptuneDriver: gremlin.driver.DriverRemoteConnection;

export async function neptuneInit(): Promise<void> {
  neptuneDriver = new gremlin.driver.DriverRemoteConnection(`ws://${process.env.NEPTUNE}/gremlin`);
}

export async function createOrUpdateUser(
): Promise<void> {
}
/* BESPOKE END <<neptune>> */
