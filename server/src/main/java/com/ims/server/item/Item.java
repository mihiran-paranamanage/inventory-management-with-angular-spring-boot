package com.ims.server.item;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class Item {

	@Id
	@GeneratedValue
	private Long id;

	@Column(nullable = false, unique = true)
	private String code;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private BigDecimal cost;

	@Column(nullable = false)
	private BigDecimal price;

	@Column(nullable = false)
	private Long quantity;

	@JsonIgnore
	@CreatedDate
	private LocalDateTime createdDate;

	@JsonIgnore
	@LastModifiedDate
	private LocalDateTime lastModifiedDate;

	Item() {
		this.code = "IMS-" + this.id;
		this.name = "IMS-Item";
		this.cost = BigDecimal.ZERO;
		this.price = BigDecimal.ZERO;
		this.quantity = 0L;
	}
}
