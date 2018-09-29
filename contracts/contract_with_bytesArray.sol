pragma solidity ^0.4.18;
contract UZHBC_V4 {
    
    address public owner = msg.sender;

    bytes32 [] public diplomaHashes;
	function issueCertificate(bytes32[] byteHash) public {
	    if (msg.sender != owner)
            revert();
        for(uint i=0;i<byteHash.length;i++)
	    diplomaHashes.push(byteHash[i]);
	 
	}
	function verifyCertificate(bytes32 byteHash) public constant returns (bool) {
		uint counter = 0;
		bool verified = false;
		while(counter<diplomaHashes.length){
		    if(diplomaHashes[counter]==byteHash){
		        verified = true;
		        return verified;
		    }else{
		        counter++;
		    }
		}
		return verified;
	}
}