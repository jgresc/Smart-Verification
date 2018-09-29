pragma solidity ^0.4.18;
contract UZHBC_V2 {
    
    address public owner = msg.sender;

    bytes32 [] public diplomaHashes;

	function issueCertificate(bytes32  _diplomaHash) public {
	    if (msg.sender != owner)
            revert();
	    diplomaHashes.push(_diplomaHash);
	}

	
	function verifyCertificate(bytes32 diplomaHash_) public constant returns (bool) {
		uint counter = 0;
		bool verified = false;
		while(counter<diplomaHashes.length){
		    if(diplomaHashes[counter]==diplomaHash_){
		        verified = true;
		        return verified;
		    }else{
		        counter++;
		    }
		}
		return verified;
	}

}