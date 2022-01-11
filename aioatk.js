/** @param {NS} ns **/
export async function main(ns) {
	var Ports = 0;
	var EndLoop = 0;
	const currentServers = ["n00dles", "foodnstuff", "sigma-cosmetics", "joesguns", "nectar-net", "hong-fang-tea",
	"harakiri-sushi", "neo-net", "zer0", "max-hardware", "iron-gym", "phantasy",
	"silver-helix", "omega-net", "crush-fitness", "johnson-ortho", "the-hub", "comptek",
	"netlink", "rothman-uni", "catalyst", "summit-uni", "rho-construction", "millenium-fitness",
	"aevum-police", "alpha-ent", "syscore", "lexo-corp", "snap-fitness", "global-pharm",
	"applied-energetics", "unitalife", "univ-energy", "nova-med", "zb-def", "zb-institute",
	"vitalife", "titan-labs", "solaris", "microdyne", "helios", "deltaone", "icarus", "zeus-med",
	"omnia", "defcomm", "galactic-cyber", "infocomm", "taiyang-digital", "stormtech", "aerocorp",
	"clarkinc", "omnitek", "nwo", "4sigma", "blade", "b-and-a", "ecorp", "fulcrumtech", "megacorp",
	"kuai-gong", "fulcrumassets", "powerhouse-fitness"];
	//////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	const files = ["worm.js"]; // PUT SCRIPTS IN LIST: var files = ["worm.js","otherworm.js","anotherworm.js"];				  const files = ["worm.js"];	
	var killscripts = 0; // 1 if you want to killall() scripts on servers and run your file, 0 if not.                        var killscripts = 1;
	var loop = 1; // 1 = loop, 0 = run once.         																		  var loop = 0;
	const TimeToSleep = 100; // Time for sleeps in script to prevent game locks, default is 100ms, may want to increase.      const TimeToSleep = 100;
	ns.disableLog("ALL");  // Just delete or comment this out if you want to see logging.                                     ns.disableLog("ALL");
	//////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
	while(EndLoop==0){
		if(loop!=1){
			EndLoop = 1;
			}
		for (var i = 0; i < currentServers.length; ++i) {
			var target = currentServers[i];
			if(i >= currentServers.length){
				i = 0;
			}
			if(killscripts != 1){
				if(ns.scriptRunning(files[0], target)){
					ns.print("script already running ", i, " ", target )
					await ns.sleep(TimeToSleep)
					continue
					}
			}
			if (ns.getServerRequiredHackingLevel(target)<= ns.getHackingLevel()){	
				if (ns.fileExists("BruteSSH.exe", "home")) {
					ns.brutessh(target);
					Ports = 1;
				}
				if (ns.fileExists("FTPCrack.exe", "home")) {
					ns.ftpcrack(target);
					Ports = 2;
				}
				if (ns.fileExists("relaySMTP.exe", "home")){
					ns.relaysmtp(target);
					Ports = 3;
				}
				if (ns.fileExists("HTTPWorm.exe", "home")){
					ns.httpworm(target);
					Ports = 4;
				}
				if (ns.fileExists("SQLInject.exe", "home")){
					ns.sqlinject(target);
					Ports = 5;
				}
				if (ns.getServerNumPortsRequired <= Ports)
					ns.nuke(target);
					await ns.sleep(TimeToSleep)
					await ns.scp(files, "home", target);
					Ports = 0;
					var threadcount = Math.floor(ns.getServerMaxRam(target)/ns.getScriptRam(files[0]));
					if (threadcount >= 1){
						if (killscripts > 0){
							ns.killall(target);
							}
							
						ns.exec(files[0], target, threadcount);	
						}
				else
					Ports = 0;		
			}
			else
				continue
				}
				}
}
