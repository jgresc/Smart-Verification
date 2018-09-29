pragma solidity ^0.4.18;
contract UZHBC {
    
    address public owner = msg.sender;

    string[] public diplomaHashes;

	function issueCertificate(string _diplomaHash) public {
	    if (msg.sender != owner)
            revert();
	    diplomaHashes.push(_diplomaHash);
	}

	
	function verifyCertificate(string diplomaHash_) public constant returns (bool) {
		uint counter = 0;
		bool verified = false;
		while(counter<diplomaHashes.length){
		    if(keccak256(diplomaHashes[counter])==keccak256(diplomaHash_)){
		        verified = true;
		        return verified;
		    }else{
		        counter++;
		    }
		}
		return verified;
	}

}